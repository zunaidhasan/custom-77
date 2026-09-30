import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://77co.carrd.co"),
  title: "Custom 77 | Custom Metal & Woodwork in Denver, Colorado",
  description: "Custom metal and wood furniture, shelving, handrails, and architectural pieces. Honest materials, good hands, and work built to last in Denver, Colorado.",
  openGraph: {
    title: "Custom 77 | Made to fit. Built to last.",
    description: "Custom furniture and architectural metalwork made with purpose in Denver, Colorado.",
    images: ["/images/work/container01.webp"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
