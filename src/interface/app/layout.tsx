import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "DEPRA | API Lifecycle & Deprecation Proxy",
  description: "Deprecation enforcement proxy for retired endpoints.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      {/* suppressHydrationWarning is recommended when using Chakra/NextThemes 
          to avoid the flash of unstyled content during hydration.
      */}
      <body style={{ minHeight: '100vh', background: '#f8fafc' }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}