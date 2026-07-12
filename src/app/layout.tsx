import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/Layouts/NavBar/NavBar";
import Footer from "@/components/Layouts/Footer/Footer";
import StoreProvider from "@/redux/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "EasyTravio — Book Hotels & Flights Worldwide",
    template: "%s | EasyTravio",
  },
  description:
    "Discover and book hotels and flights worldwide with EasyTravio. Compare prices, read reviews, and find the best deals on accommodations and air travel.",
  keywords: [
    "hotel booking",
    "flight booking",
    "travel deals",
    "hotel search",
    "flight search",
    "vacation packages",
    "travel agency",
    "book hotels online",
    "cheap flights",
    "accommodation",
  ],
  authors: [{ name: "EasyTravio" }],
  creator: "EasyTravio",
  metadataBase: new URL("https://easy-travio.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://easy-travio.vercel.app",
    siteName: "EasyTravio",
    title: "EasyTravio — Book Hotels & Flights Worldwide",
    description:
      "Discover and book hotels and flights worldwide. Compare prices, read reviews, and find the best deals.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EasyTravio — Travel Booking Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EasyTravio — Book Hotels & Flights Worldwide",
    description:
      "Discover and book hotels and flights worldwide. Compare prices, read reviews, and find the best deals.",
    images: ["/og-image.png"],
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background">
        <StoreProvider>
          <NavBar />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
