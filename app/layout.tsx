import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mobile Responsive Tester - Test Your Website Across All Devices",
  description: "A comprehensive, in-browser responsive design testing tool. Test your website's mobile responsiveness across 50+ device viewports simultaneously. Free, fast, and SEO-optimized.",
  keywords: ["responsive design", "mobile tester", "responsive checker", "device testing", "mobile-first", "SEO", "web development"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
