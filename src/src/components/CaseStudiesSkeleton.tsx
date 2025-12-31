import { Skeleton } from "./ui/Skeleton";

export function CaseStudiesSkeleton() {
    return (
        <section className="py-16 md:py-20 lg:py-28 bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)] relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[var(--neon-cyan)] rounded-full blur-[150px] opacity-10"></div>
                <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-[var(--neon-green)] rounded-full blur-[150px] opacity-10"></div>
            </div>

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px] opacity-40"></div>

            <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
                {/* Header Skeleton */}
                <div className="text-center mb-12 md:mb-16 flex flex-col items-center">
                    {/* Badge Skeleton */}
                    <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/[0.03] border-2 border-[var(--neon-cyan)]/30 rounded-full backdrop-blur-sm mb-8">
                        <Skeleton className="h-5 w-32 bg-white/10" />
                    </div>

                    {/* Title Skeleton */}
                    <Skeleton className="h-10 md:h-12 w-3/4 md:w-1/2 max-w-2xl mb-5 bg-white/10" />

                    {/* Description Skeleton */}
                    <Skeleton className="h-6 w-full md:w-2/3 max-w-2xl mb-6 bg-white/5" />

                    {/* Link Skeleton */}
                    <Skeleton className="h-6 w-40 bg-white/5" />
                </div>

                {/* Case Studies Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {[...Array(6)].map((_, index) => (
                        <div
                            key={index}
                            className="h-full bg-white/[0.02] border-2 border-[var(--border-cyan)]/30 rounded-2xl overflow-hidden backdrop-blur-sm"
                        >
                            {/* Image Placeholder */}
                            <div className="relative h-48 bg-gradient-to-br from-[var(--neon-cyan)]/10 to-[var(--neon-green)]/10 border-b-2 border-[var(--border-cyan)]/30 overflow-hidden">
                                <Skeleton className="w-full h-full bg-white/5" />
                            </div>

                            {/* Content */}
                            <div className="p-6 md:p-8 space-y-4">
                                {/* Industry Tag */}
                                <Skeleton className="h-6 w-24 rounded-lg bg-[var(--neon-cyan)]/10" />

                                {/* Title */}
                                <Skeleton className="h-8 w-3/4 bg-white/10" />

                                {/* Client */}
                                <Skeleton className="h-5 w-1/2 bg-white/5" />

                                {/* Summary */}
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full bg-white/5" />
                                    <Skeleton className="h-4 w-full bg-white/5" />
                                    <Skeleton className="h-4 w-2/3 bg-white/5" />
                                </div>

                                {/* Metrics Row */}
                                <div className="flex gap-4 pt-4 border-t border-white/10">
                                    <Skeleton className="h-4 w-20 bg-white/5" />
                                    <Skeleton className="h-4 w-20 bg-white/5" />
                                </div>

                                {/* Technologies */}
                                <div className="flex gap-2">
                                    <Skeleton className="h-6 w-16 rounded bg-white/5" />
                                    <Skeleton className="h-6 w-16 rounded bg-white/5" />
                                    <Skeleton className="h-6 w-16 rounded bg-white/5" />
                                </div>

                                {/* Read More Link */}
                                <div className="pt-2">
                                    <Skeleton className="h-5 w-32 bg-white/5" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA Skeleton */}
                <div className="text-center mt-16 md:mt-20 flex flex-col items-center">
                    <Skeleton className="h-5 w-64 mb-6 bg-white/10" />
                    <Skeleton className="h-14 w-48 rounded-lg bg-white/10" />
                </div>
            </div>
        </section>
    );
}
