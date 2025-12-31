-- Create comments table for blog posts
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blog_post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  author_name VARCHAR(255) NOT NULL,
  author_email VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT true,
  status VARCHAR(20) DEFAULT 'approved', -- 'pending', 'approved', 'spam', 'trash'
  parent_comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_comments_blog_post ON comments(blog_post_id);
CREATE INDEX IF NOT EXISTS idx_comments_approved ON comments(is_approved);
CREATE INDEX IF NOT EXISTS idx_comments_parent ON comments(parent_comment_id);
CREATE INDEX IF NOT EXISTS idx_comments_created ON comments(created_at DESC);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_comments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION update_comments_updated_at();

-- RLS Policies
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Public can read approved comments
CREATE POLICY "Comments are viewable by everyone if approved"
  ON comments FOR SELECT
  USING (is_approved = true);

-- Authenticated users (admins) can view all comments
CREATE POLICY "Authenticated users can view all comments"
  ON comments FOR SELECT
  TO authenticated
  USING (true);

-- Anyone can insert comments (requires moderation)
CREATE POLICY "Anyone can create comments"
  ON comments FOR INSERT
  WITH CHECK (true);

-- Only authenticated users can update/delete comments
CREATE POLICY "Authenticated users can update comments"
  ON comments FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete comments"
  ON comments FOR DELETE
  USING (auth.role() = 'authenticated');

-- Add comment count to blog_posts (for performance)
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS comment_count INTEGER DEFAULT 0;

-- Function to update comment count
CREATE OR REPLACE FUNCTION update_blog_post_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.is_approved = true THEN
    UPDATE blog_posts 
    SET comment_count = comment_count + 1 
    WHERE id = NEW.blog_post_id;
  ELSIF TG_OP = 'UPDATE' AND OLD.is_approved = false AND NEW.is_approved = true THEN
    UPDATE blog_posts 
    SET comment_count = comment_count + 1 
    WHERE id = NEW.blog_post_id;
  ELSIF TG_OP = 'UPDATE' AND OLD.is_approved = true AND NEW.is_approved = false THEN
    UPDATE blog_posts 
    SET comment_count = comment_count - 1 
    WHERE id = NEW.blog_post_id;
  ELSIF TG_OP = 'DELETE' AND OLD.is_approved = true THEN
    UPDATE blog_posts 
    SET comment_count = comment_count - 1 
    WHERE id = OLD.blog_post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_comment_count
  AFTER INSERT OR UPDATE OR DELETE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_post_comment_count();
