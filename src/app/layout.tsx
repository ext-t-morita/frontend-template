import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "User Provisioning",
  description: "Next.js 16 + React 19 + Storybook 10 + Tailwind + Biome",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-screen bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
