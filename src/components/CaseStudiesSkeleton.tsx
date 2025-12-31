import { Skeleton } from "./ui/skeleton";

export function CaseStudiesSkeleton() {
    return (
        <section className="py-16 md:py-20 lg:py-28 bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)] relative overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
                {/* Header Skeleton */}
                <div className="text-center mb-12 md:mb-16 flex flex-col items-center">
                    <Skeleton className="h-10 w-48 rounded-full mb-8" />
                    <Skeleton className="h-12 w-3/4 md:w-1/2 mb-5" />
                    <Skeleton className="h-6 w-full md:w-2/3 max-w-2xl mb-6" />
                    <Skeleton className="h-6 w-40" />
                </div>

                {/* Case Studies Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {[...Array(6)].map((_, index) => (
                        <div
                            key={index}
                            className="h-full bg-white/[0.02] border-2 border-white/5 rounded-2xl overflow-hidden"
                        >
                            {/* Image Placeholder */}
                            <Skeleton className="h-48 w-full rounded-none" />

                            {/* Content */}
                            <div className="p-6 md:p-8 space-y-4">
                                {/* Industry Tag */}
                                <Skeleton className="h-6 w-24 rounded-lg" />

                                {/* Title */}
                                <Skeleton className="h-8 w-3/4" />

                                {/* Client */}
                                <Skeleton className="h-5 w-1/2" />

                                {/* Summary */}
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-2/3" />
                                </div>

                                {/* Metrics Row */}
                                <div className="flex gap-4 pt-4 border-t border-white/10">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-4 w-20" />
                                </div>

                                {/* Technologies */}
                                <div className="flex gap-2">
                                    <Skeleton className="h-6 w-16" />
                                    <Skeleton className="h-6 w-16" />
                                    <Skeleton className="h-6 w-16" />
                                </div>

                                {/* Read More Link */}
                                <div className="pt-2">
                                    <Skeleton className="h-5 w-32" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
