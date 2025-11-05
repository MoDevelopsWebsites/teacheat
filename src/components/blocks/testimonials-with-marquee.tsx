import { cn } from "@/lib/utils"
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card"

interface TestimonialsSectionProps {
  title: string
  description: string
  testimonials: Array<{
    author: TestimonialAuthor
    text: string
    href?: string
  }>
  className?: string
}

export function TestimonialsSection({ 
  title,
  description,
  testimonials,
  className 
}: TestimonialsSectionProps) {
  // Duplicate testimonials to ensure continuous marquee effect
  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className={cn(
      "bg-white text-foreground", // Changed background to white as per screenshot
      "py-12 sm:py-24 md:py-32 px-0",
      className
    )}>
      <div className="mx-auto flex w-full flex-col items-center gap-4 text-center sm:gap-8">
        <div className="flex flex-col items-center gap-2 px-4 sm:gap-4">
          <h2 className="max-w-[720px] text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-gray-900">
            {title}
          </h2>
          <p className="text-base max-w-[600px] font-normal text-gray-600 sm:text-lg">
            {description}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8">
          {/* First Marquee Row */}
          <div className="group flex overflow-hidden p-2 [--gap:1.5rem] [gap:var(--gap)] flex-row [--duration:40s] mb-6">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
              {extendedTestimonials.map((testimonial, i) => (
                <TestimonialCard 
                  key={`row1-${i}`}
                  {...testimonial}
                />
              ))}
            </div>
          </div>

          {/* Second Marquee Row (offset) */}
          <div className="group flex overflow-hidden p-2 [--gap:1.5rem] [gap:var(--gap)] flex-row [--duration:40s]">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee-reverse flex-row group-hover:[animation-play-state:paused]">
              {extendedTestimonials.map((testimonial, i) => (
                <TestimonialCard 
                  key={`row2-${i}`}
                  {...testimonial}
                />
              ))}
            </div>
          </div>

          {/* Fade gradients */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-white sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-white sm:block" />
        </div>
      </div>
    </section>
  )
}