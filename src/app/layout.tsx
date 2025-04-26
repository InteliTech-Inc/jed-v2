import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import Navbar from "@/components/navbar";
import "./globals.css";
import Footer from "@/components/footer";

export const viewport: Viewport = {
  themeColor: "oklch(0.21 0.0198 160.28)",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
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
  },
  {
    url: `${process.env.NEXT_PUBLIC_LIVE_URL}/src/app/opengraph-image-square.png`,
    width: 400,
    height: 400,
  },
];

const description =
  "Find all the tools you need to create great online events, like ticketing, nomination submissions, and voting. It's easy to use for both organizers and participants.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_LIVE_URL as string),
  title: {
    default: "JED",
    template: "JED | %s",
  },
  description,
  twitter: {
    description,
    card: "summary_large_image",
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
    authors: [
      "Evans Elabo",
      "Diabene Yaw Addo",
      "Joshua Richardson Owusu",
      "Nana Kwesi Asante",
    ],
    url: process.env.NEXT_PUBLIC_LIVE_URL as string,
    images: openGraphImagesAbsolute,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${switzer.variable} ${satoshi.variable} antialiased`}>
        <Navbar />
        <div className="">
          <Toaster
            closeButton
            className="font-sans"
            position="top-center"
            richColors
          />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
