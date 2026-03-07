import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "pivoshenko.startpage",
  description: "Minimal IDE-style startpage for daily links",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
