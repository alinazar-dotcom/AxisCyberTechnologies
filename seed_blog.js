const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const categories = [
    { name: 'AI & Machine Learning', slug: 'ai-ml' },
    { name: 'Blockchain & Web3', slug: 'blockchain-web3' },
    { name: 'Software Engineering', slug: 'software-engineering' },
    { name: 'Cloud & DevOps', slug: 'cloud-devops' },
    { name: 'Mobile Development', slug: 'mobile-development' },
    { name: 'Cybersecurity', slug: 'cybersecurity' },
    { name: 'Product Design', slug: 'product-design' }
];

const tags = [
    { name: 'Tutorial', slug: 'tutorial' },
    { name: 'Industry Trends', slug: 'industry-trends' },
    { name: 'Best Practices', slug: 'best-practices' },
    { name: 'Case Study', slug: 'case-study' },
    { name: 'Technology', slug: 'technology' },
    { name: 'Innovation', slug: 'innovation' },
    { name: 'Leadership', slug: 'leadership' },
    { name: 'AI/ML', slug: 'ai-ml-tag' },
    { name: 'Blockchain', slug: 'blockchain-tag' },
    { name: 'Architecture', slug: 'architecture' },
    { name: 'Security', slug: 'security' },
    { name: 'Cloud', slug: 'cloud' },
    { name: 'Mobile', slug: 'mobile' },
    { name: 'Kubernetes', slug: 'kubernetes' },
    { name: 'DevOps', slug: 'devops' },
    { name: 'Edge Computing', slug: 'edge-computing' },
    { name: 'UX/UI', slug: 'ux-ui' },
    { name: 'Web3', slug: 'web3' },
    { name: 'Data Engineering', slug: 'data-engineering' },
    { name: 'Accessibility', slug: 'accessibility' }
];

const blogPosts = [
    {
        title: 'The Future of AI: How Machine Learning is Transforming Enterprise Software',
        slug: 'future-of-ai-machine-learning-enterprise',
        excerpt: 'Explore how artificial intelligence and machine learning are revolutionizing the way businesses build and deploy software solutions at scale.',
        content: 'Artificial Intelligence (AI) and Machine Learning (ML) are no longer just buzzwords; they are the driving forces behind the next generation of enterprise software. From predictive analytics to automated decision-making, AI is transforming how businesses operate. In this article, we delve deep into the practical applications of ML in enterprise environments and how it\'s reshaping the software development lifecycle.',
        category_name: 'AI & Machine Learning',
        tag_names: ['AI/ML', 'Industry Trends', 'Innovation'],
        author_name: 'Omer Abbas',
        author_role: 'Founder & CTO',
        status: 'published',
        published_at: '2025-01-20T10:00:00Z',
        views: 12500,
        is_featured: true
    },
    {
        title: 'Building Scalable Blockchain Applications: Lessons from Production',
        slug: 'scalable-blockchain-applications-lessons',
        excerpt: 'Real-world insights from deploying blockchain solutions for Fortune 500 companies, including performance optimization and security best practices.',
        content: 'Deploying blockchain applications in a production environment presents unique challenges. Scalability, security, and interoperability are critical factors that can make or break a project. Drawing from our experience building solutions for Fortune 500 companies, we share hard-earned lessons on optimizing smart contracts, managing gas costs, and ensuring robust security in decentralized systems.',
        category_name: 'Blockchain & Web3',
        tag_names: ['Blockchain', 'Best Practices', 'Case Study'],
        author_name: 'Muneeb Rehman',
        author_role: 'CEO',
        status: 'published',
        published_at: '2025-01-18T14:30:00Z',
        views: 9800,
        is_featured: true
    },
    {
        title: 'Microservices Architecture: When to Use It and When to Avoid It',
        slug: 'microservices-architecture-guide',
        excerpt: 'A comprehensive guide to microservices architecture, helping you decide whether it\'s the right choice for your next project.',
        content: 'Microservices architecture offers numerous benefits, including independent scalability and technology flexibility. However, it also introduces complexity in deployment and communication. This guide explores the trade-offs of microservices versus monolithic architectures, providing a framework for deciding which approach is best suited for your specific business needs and technical capabilities.',
        category_name: 'Software Engineering',
        tag_names: ['Architecture', 'Best Practices', 'Tutorial'],
        author_name: 'Omer Abbas',
        author_role: 'Founder & CTO',
        status: 'published',
        published_at: '2025-01-15T09:00:00Z',
        views: 15200,
        is_featured: true
    },
    {
        title: 'Zero-Trust Security in Modern Cloud Infrastructure',
        slug: 'zero-trust-security-cloud',
        excerpt: 'Implementing zero-trust security principles in cloud environments to protect against sophisticated cyber threats.',
        content: 'In today\'s threat landscape, the traditional perimeter-based security model is no longer sufficient. Zero-trust security operates on the principle of "never trust, always verify." We discuss how to implement zero-trust in cloud-native environments, covering identity management, micro-segmentation, and continuous monitoring to safeguard your critical assets.',
        category_name: 'Cybersecurity',
        tag_names: ['Security', 'Cloud', 'Best Practices'],
        author_name: 'Ali Rehman',
        author_role: 'Business Development Executive',
        status: 'published',
        published_at: '2025-01-12T11:15:00Z',
        views: 8600,
        is_featured: false
    },
    {
        title: 'React Native vs Flutter: A 2025 Comparison for Mobile Development',
        slug: 'react-native-vs-flutter-2025',
        excerpt: 'An updated comparison of the two leading cross-platform mobile frameworks, based on our experience building production apps.',
        content: 'The debate between React Native and Flutter continues into 2025. Both frameworks have matured significantly, offering near-native performance and developer productivity. We compare them across key dimensions: performance, ecosystem, developer experience, and long-term maintainability, helping you choose the right tool for your next mobile project.',
        category_name: 'Mobile Development',
        tag_names: ['Mobile', 'Technology', 'Tutorial'],
        author_name: 'Muneeb Rehman',
        author_role: 'CEO',
        status: 'published',
        published_at: '2025-01-10T16:45:00Z',
        views: 18900,
        is_featured: false
    },
    {
        title: 'Kubernetes Best Practices: Lessons from Managing 100+ Production Clusters',
        slug: 'kubernetes-best-practices-production',
        excerpt: 'Hard-earned lessons from deploying and managing Kubernetes at scale across diverse production environments.',
        content: 'Managing Kubernetes at scale requires more than just knowing the commands. It involves careful planning of resource limits, network policies, and monitoring strategies. We share our best practices for cluster configuration, security hardening, and cost optimization derived from managing over 100 production clusters for diverse clients.',
        category_name: 'Cloud & DevOps',
        tag_names: ['Kubernetes', 'DevOps', 'Best Practices'],
        author_name: 'Omer Abbas',
        author_role: 'Founder & CTO',
        status: 'published',
        published_at: '2025-01-08T13:20:00Z',
        views: 11400,
        is_featured: false
    },
    {
        title: 'The Rise of Edge Computing: What Developers Need to Know',
        slug: 'edge-computing-developers-guide',
        excerpt: 'Understanding edge computing architecture and its implications for modern application development.',
        content: 'Edge computing is bringing computation and data storage closer to the sources of data. This reduces latency and bandwidth use, enabling real-time applications that were previously impossible. Developers need to understand how to architect applications for the edge, considering data consistency, security, and the distributed nature of edge nodes.',
        category_name: 'Cloud & DevOps',
        tag_names: ['Edge Computing', 'Industry Trends', 'Technology'],
        author_name: 'Omer Abbas',
        author_role: 'Founder & CTO',
        status: 'published',
        published_at: '2025-01-05T10:00:00Z',
        views: 7200,
        is_featured: false
    },
    {
        title: 'Designing User-Centric AI Interfaces: Beyond the Chatbot',
        slug: 'user-centric-ai-interfaces',
        excerpt: 'How to design AI-powered interfaces that feel natural and intuitive, moving beyond simple chatbot implementations.',
        content: 'As AI becomes integrated into every application, the focus is shifting from what AI can do to how users interact with it. Designing effective AI interfaces requires a deep understanding of user intent and the ability to provide transparent, explainable AI interactions. We explore design patterns that go beyond the chatbot, creating more intuitive and helpful user experiences.',
        category_name: 'Product Design',
        tag_names: ['UX/UI', 'AI/ML', 'Innovation'],
        author_name: 'Ali Rehman',
        author_role: 'Business Development Executive',
        status: 'published',
        published_at: '2025-01-03T09:30:00Z',
        views: 9100,
        is_featured: false
    },
    {
        title: 'Web3 Development: A Practical Guide for Traditional Web Developers',
        slug: 'web3-guide-traditional-developers',
        excerpt: 'Transitioning from Web2 to Web3 development, with practical examples and common pitfalls to avoid.',
        content: 'Web3 represents a paradigm shift in how we build and interact with applications. For traditional web developers, the transition involves learning new concepts like decentralization, smart contracts, and cryptographic identity. This guide provides a practical roadmap for making the jump, with code examples and tips for avoiding common mistakes.',
        category_name: 'Blockchain & Web3',
        tag_names: ['Web3', 'Tutorial', 'Technology'],
        author_name: 'Muneeb Rehman',
        author_role: 'CEO',
        status: 'published',
        published_at: '2025-01-01T12:00:00Z',
        views: 14600,
        is_featured: false
    },
    {
        title: 'The Economics of Technical Debt: When to Pay It Down',
        slug: 'technical-debt-economics',
        excerpt: 'A data-driven approach to managing technical debt, helping engineering leaders make informed decisions.',
        content: 'Technical debt is an inevitable part of software development, but it must be managed strategically. Engineering leaders need to balance the need for speed with the long-term health of the codebase. We present a data-driven approach to identifying, measuring, and prioritizing technical debt, helping you decide when it\'s time to invest in refactoring.',
        category_name: 'Software Engineering',
        tag_names: ['Leadership', 'Best Practices', 'Technology'],
        author_name: 'Omer Abbas',
        author_role: 'Founder & CTO',
        status: 'published',
        published_at: '2024-12-28T15:00:00Z',
        views: 10300,
        is_featured: false
    },
    {
        title: 'Real-time Data Processing with Apache Kafka: Architecture Patterns',
        slug: 'kafka-architecture-patterns',
        excerpt: 'Proven architectural patterns for building robust real-time data pipelines using Apache Kafka.',
        content: 'Apache Kafka has become the de facto standard for real-time data streaming. Building robust pipelines requires understanding patterns like event sourcing, CQRS, and stream processing. We explore these patterns in detail, providing architectural blueprints for scalable and fault-tolerant data processing systems.',
        category_name: 'Software Engineering',
        tag_names: ['Data Engineering', 'Tutorial', 'Best Practices'],
        author_name: 'Omer Abbas',
        author_role: 'Founder & CTO',
        status: 'published',
        published_at: '2024-12-25T11:00:00Z',
        views: 8900,
        is_featured: false
    },
    {
        title: 'Building Accessible Web Applications: A Developer\'s Checklist',
        slug: 'accessible-web-applications-checklist',
        excerpt: 'Practical accessibility guidelines and testing strategies for creating inclusive web applications.',
        content: 'Accessibility is not just a legal requirement; it\'s a fundamental aspect of good software engineering. Creating inclusive web applications ensures that everyone, regardless of ability, can access your services. We provide a comprehensive checklist for developers, covering semantic HTML, ARIA roles, keyboard navigation, and automated testing for accessibility.',
        category_name: 'Product Design',
        tag_names: ['Accessibility', 'Best Practices', 'Tutorial'],
        author_name: 'Ali Rehman',
        author_role: 'Business Development Executive',
        status: 'published',
        published_at: '2024-12-22T10:00:00Z',
        views: 6800,
        is_featured: false
    }
];

async function seed() {
    console.log('Starting seed...');

    // 1. Upsert Categories
    console.log('Upserting categories...');
    const { data: catData, error: catError } = await supabase
        .from('blog_categories')
        .upsert(categories, { onConflict: 'slug' })
        .select();

    if (catError) {
        console.error('Error upserting categories:', catError);
        return;
    }
    console.log(`Upserted ${catData.length} categories.`);

    // 2. Upsert Tags
    console.log('Upserting tags...');
    const { data: tagData, error: tagError } = await supabase
        .from('blog_tags')
        .upsert(tags, { onConflict: 'name' })
        .select();

    if (tagError) {
        console.error('Error upserting tags:', tagError);
        return;
    }
    console.log(`Upserted ${tagData.length} tags.`);

    // Create maps for easy lookup
    const categoryMap = {};
    catData.forEach(c => categoryMap[c.name] = c.id);

    const tagMap = {};
    tagData.forEach(t => tagMap[t.name] = t.id);

    // 3. Insert Blog Posts
    console.log('Inserting blog posts...');
    for (const post of blogPosts) {
        const { tag_names, category_name, ...postData } = post;

        // Check if post already exists
        const { data: existingPost } = await supabase
            .from('blog_posts')
            .select('id')
            .eq('slug', postData.slug)
            .single();

        let postId;
        if (existingPost) {
            console.log(`Post already exists: ${postData.title}, updating...`);
            const { data: updatedPost, error: updateError } = await supabase
                .from('blog_posts')
                .update({
                    ...postData,
                    category_id: categoryMap[category_name],
                    updated_at: new Date().toISOString()
                })
                .eq('id', existingPost.id)
                .select()
                .single();

            if (updateError) {
                console.error(`Error updating post ${postData.title}:`, updateError);
                continue;
            }
            postId = updatedPost.id;
        } else {
            const { data: newPost, error: insertError } = await supabase
                .from('blog_posts')
                .insert([{
                    ...postData,
                    category_id: categoryMap[category_name]
                }])
                .select()
                .single();

            if (insertError) {
                console.error(`Error inserting post ${postData.title}:`, insertError);
                continue;
            }
            postId = newPost.id;
            console.log(`Inserted post: ${postData.title}`);
        }

        // 4. Insert Blog Post Tags
        if (postId && tag_names) {
            // Clear existing tags for this post first
            await supabase.from('blog_post_tags').delete().eq('post_id', postId);

            const postTags = tag_names.map(tagName => ({
                post_id: postId,
                tag_id: tagMap[tagName]
            })).filter(pt => pt.tag_id);

            if (postTags.length > 0) {
                const { error: ptError } = await supabase
                    .from('blog_post_tags')
                    .insert(postTags);

                if (ptError) {
                    console.error(`Error inserting tags for post ${postData.title}:`, ptError);
                }
            }
        }
    }

    console.log('Seed completed successfully!');
}

seed();
