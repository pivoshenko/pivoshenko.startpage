import { Github, Linkedin } from "lucide-react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "pivoshenko.startpage",
  description: "Minimal startpage for daily links",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <div className="page-shell">
          <header className="site-header">
            <nav className="site-nav">
              <Link href="/" className="logo">
                pivoshenko.startpage
              </Link>
              <div className="nav-links">
                <Link href="/" className="nav-link nav-link-active">
                  Home
                </Link>
                <a href="https://pivoshenko.dev" className="nav-link" target="_blank" rel="noreferrer">
                  Blog
                </a>
              </div>
            </nav>
          </header>

          <main className="content">{children}</main>

          <footer className="site-footer">
            <div className="site-footer-inner">
              <span>2026 Volodymyr Pivoshenko</span>
              <div className="footer-icons">
                <a
                  href="https://github.com/pivoshenko"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="footer-icon-link"
                >
                  <Github className="footer-icon" />
                </a>
                <a
                  href="https://www.linkedin.com/in/pivoshenko"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="footer-icon-link"
                >
                  <Linkedin className="footer-icon" />
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
