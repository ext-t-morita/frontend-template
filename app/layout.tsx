import type { Metadata } from "next";
import "@repo/design-tokens/styles.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Workspace Web",
  description: "Server-first Next.js workspace scaffold",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html data-theme="light" lang="en">
      <body>{children}</body>
    </html>
  );
}
