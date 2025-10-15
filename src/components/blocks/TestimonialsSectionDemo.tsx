import { TestimonialsSection } from "@/components/blocks/testimonials-with-marquee"


const testimonials = [
  {
    author: {
      name: "Emma Thompson",
      handle: "@emmaai",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    text: "Using this AI platform has transformed how we handle data analysis. The speed and accuracy are unprecedented.",
    href: "https://twitter.com/emmaai"
  },
  {
    author: {
      name: "David Park",
      handle: "@davidtech",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "The API integration is flawless. We've reduced our development time by 60% since implementing this solution.",
    href: "https://twitter.com/davidtech"
  },
  {
    author: {
      name: "Sofia Rodriguez",
      handle: "@sofiaml",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    text: "Finally, an AI tool that actually understands context! The accuracy in natural language processing is impressive."
  },
  {
    author: {
      name: "Liam Chen",
      handle: "@liamdev",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b8646d1890?w=150&h=150&fit=crop&crop=face"
    },
    text: "The real-time insights are a game-changer for our sales team. Highly recommend this platform!",
    href: "https://twitter.com/liamdev"
  },
  {
    author: {
      name: "Olivia White",
      handle: "@olivia_data",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face"
    },
    text: "Customer support is incredibly responsive and helpful. They truly stand behind their product.",
    href: "https://twitter.com/olivia_data"
  },
  {
    author: {
      name: "Noah Green",
      handle: "@noah_ai",
      avatar: "https://images.unsplash.com/photo-1543610892-0b1f7e6b8ef4?w=150&h=150&fit=crop&crop=face"
    },
    text: "The documentation is clear and comprehensive, making integration a breeze even for complex projects.",
    href: "https://twitter.com/noah_ai"
  }
]

export function TestimonialsSectionDemo() {
  return (
    <TestimonialsSection
      title="Trusted by developers worldwide"
      description="Join thousands of developers who are already building the future with our AI platform"
      testimonials={testimonials}
    />
  )
}