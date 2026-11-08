import { SmoothScroll } from "@/components/smooth-scroll";

// Lenis sur les pages éditoriales (liste + guides).
export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return <SmoothScroll>{children}</SmoothScroll>;
}
