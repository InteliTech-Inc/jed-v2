import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import Navbar from "@/components/navbar";
import "./globals.css";
import Footer from "@/components/footer";
import { HOME_SCHEMA } from "@/structured-data/home.schema";
export const viewport: Viewport = {
  themeColor: "oklch(0.21 0.0198 160.28)",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
};

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Light.woff2",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-heading",
  display: "swap",
});
const switzer = localFont({
  src: [
    {
      path: "../../public/fonts/Outfit-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Outfit-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Outfit-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Outfit-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Outfit-Light.woff2",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-paragraph",
  display: "swap",
});

const openGraphImagesAbsolute = [
  {
    url: `${process.env.NEXT_PUBLIC_LIVE_URL}/src/app/opengraph-image.png`,
    width: 1200,
    height: 630,
    alt: "JED Event Management Platform Preview",
  },
  {
    url: `${process.env.NEXT_PUBLIC_LIVE_URL}/src/app/opengraph-image-square.png`,
    width: 400,
    height: 400,
    alt: "JED Event Management Platform Logo",
  },
];

const description =
  "We provide all the tools you need to create great online events. We offer e-voting, nominations submissions, and ticketing. Our platform is easy to use for both organizers and participants.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_LIVE_URL as string),
  title: {
    default: "JED - Event Management Platform",
    template: "JED | %s",
  },
  description,
  keywords: [
    "event management",
    "online events",
    "event platform",
    "event ticketing",
    "event voting",
    "event nominations",
    "online voting",
    "online nominations",
    "e-voting",
    "e-nominations",
    "e-ticketing",
  ],
  authors: [{ name: "Evans Elabo" }, { name: "Diabene Yaw Addo" }, { name: "Joshua Richardson Owusu" }, { name: "Nana Kwesi Asante" }],
  creator: "JED Team",
  publisher: "JED",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  twitter: {
    description,
    card: "summary_large_image",
    creator: "@jed-events",
    site: "@jed-events",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_LIVE_URL as string,
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    siteName: "JED",
    description,
    url: process.env.NEXT_PUBLIC_LIVE_URL as string,
    images: openGraphImagesAbsolute,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${switzer.variable} ${satoshi.variable} antialiased`} role="document">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-black">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="min-h-screen">
          <Toaster closeButton className="font-sans" position="top-center" richColors aria-live="polite" />
          {children}
        </main>
        <Footer />
        <script type="application/ld+json" id="schema-home" dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_SCHEMA) }} aria-hidden="true" />
      </body>
    </html>
  );
}
