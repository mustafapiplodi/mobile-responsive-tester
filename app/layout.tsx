import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mobile Responsive Tester - Test Your Website Across All Devices",
  description: "A comprehensive, in-browser responsive design testing tool. Test your website's mobile responsiveness across 50+ device viewports simultaneously. Free, fast, and SEO-optimized.",
  keywords: ["responsive design", "mobile tester", "responsive checker", "device testing", "mobile-first", "SEO", "web development", "responsive design checker", "mobile friendly test", "viewport tester"],
  authors: [{ name: "Mobile Responsive Tester" }],
  creator: "Mobile Responsive Tester",
  publisher: "Mobile Responsive Tester",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mobile-responsive-tester.vercel.app",
    title: "Mobile Responsive Tester - Test Your Website Across All Devices",
    description: "Free in-browser tool to test website responsiveness across 50+ devices. Screenshot, analyze, and optimize your mobile-first design.",
    siteName: "Mobile Responsive Tester",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile Responsive Tester - Test Your Website Across All Devices",
    description: "Free in-browser tool to test website responsiveness across 50+ devices.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "verification-token",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Mobile Responsive Tester",
    "applicationCategory": "DeveloperApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "operatingSystem": "Web",
    "description": "A comprehensive, in-browser responsive design testing tool. Test your website's mobile responsiveness across 50+ device viewports simultaneously.",
    "featureList": [
      "Test across 50+ device viewports",
      "Custom device creation",
      "Screenshot capture",
      "Device set management",
      "Shareable configurations",
      "Performance insights",
      "Dark mode support"
    ],
    "screenshot": "https://mobile-responsive-tester.vercel.app/screenshot.png",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "128"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="canonical" href="https://mobile-responsive-tester.vercel.app" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
