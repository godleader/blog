import { Providers } from "@/components/Providers";
import "./globals.css";
import type { Metadata } from "next";
import Analytics from "@/components/Analytics";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Only In Malaysia",
  description: "Discover Malaysia's Unique Charm - Only in Malaysia Explore the best of Malaysia's culture, food, travel destinations, and local insights with Only in Malaysia. Stay updated with captivating stories, viral moments, and the quirks that make Malaysia truly special. From hidden gems to iconic landmarks, we bring you closer to everything that’s unique and authentic in Malaysia. Join us for a journey through this vibrant, multicultural nation—only in Malaysia!",
};

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`light ${inter.className}`}>
      <Analytics />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
