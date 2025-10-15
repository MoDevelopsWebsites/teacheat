import { TestimonialsSection } from "@/components/blocks/testimonials-with-marquee"


const testimonials = [
  {
    author: {
      name: "Emma Thompson",
      handle: "@emma_sales",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    text: "Teacheat is a game-changer for my sales calls! The real-time suggestions help me overcome objections instantly and close deals faster. It's like having a co-pilot in every meeting.",
    href: "https://twitter.com/emma_sales"
  },
  {
    author: {
      name: "David Park",
      handle: "@david_interviews",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "I used Teacheat for my job interviews, and it was incredible. The instant answers to tough questions made me feel so prepared and confident. I landed the job!",
    href: "https://twitter.com/david_interviews"
  },
  {
    author: {
      name: "Sofia Rodriguez",
      handle: "@sofia_student",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    text: "As a student, Teacheat has revolutionized my study groups. It takes perfect notes and helps me find answers to complex homework questions in real-time. No more scrambling!",
    href: "https://twitter.com/sofia_student"
  },
  {
    author: {
      name: "Liam Chen",
      handle: "@liam_marketing",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b8646d1890?w=150&h=150&fit=crop&crop=face"
    },
    text: "Understanding customer needs during marketing strategy meetings is crucial. Teacheat's real-time insights help us tailor our campaigns on the fly, leading to much better results.",
    href: "https://twitter.com/liam_marketing"
  },
  {
    author: {
      name: "Olivia White",
      handle: "@olivia_pm",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face"
    },
    text: "Managing project meetings is so much easier with Teacheat. The automated notes capture every detail, freeing me up to focus on the discussion. Post-meeting recaps are a breeze!",
    href: "https://twitter.com/olivia_pm"
  },
  {
    author: {
      name: "Noah Green",
      handle: "@noah_support",
      avatar: "https://images.unsplash.com/photo-1543610892-0b1f7e6b8ef4?w=150&h=150&fit=crop&crop=face"
    },
    text: "Teacheat helps our support team provide instant, accurate answers to customer queries during calls. It's boosted our first-call resolution rates and overall customer satisfaction.",
    href: "https://twitter.com/noah_support"
  }
]

export function TestimonialsSectionDemo() {
  return (
    <TestimonialsSection
      title="Trusted by professionals and students alike"
      description="Join thousands who are excelling in their meetings, interviews, and studies with Teacheat's AI assistance."
      testimonials={testimonials}
    />
  )
}