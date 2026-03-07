import type React from "react";
import {
  Bookmark,
  Calendar,
  FolderOpen,
  Github,
  Mail,
  Music2,
  Newspaper,
  Search,
  Tv,
} from "lucide-react";

type LinkItem = {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
};

const cards: { title: string; links: LinkItem[] }[] = [
  {
    title: "bookmarks",
    links: [
      { name: "raindrop", url: "https://app.raindrop.io", icon: Bookmark },
      { name: "musicforprogramming", url: "https://musicforprogramming.net", icon: Music2 },
      { name: "gmail", url: "https://mail.google.com", icon: Mail },
      { name: "calendar", url: "https://calendar.google.com", icon: Calendar },
    ],
  },
  {
    title: "dev",
    links: [
      { name: "github", url: "https://github.com", icon: Github },
      { name: "pivoshenko.dev", url: "https://pivoshenko.dev", icon: Search },
      { name: "motherduck", url: "https://app.motherduck.com", icon: FolderOpen },
      { name: "hackernews", url: "https://news.ycombinator.com", icon: Newspaper },
    ],
  },
  {
    title: "media",
    links: [
      { name: "steam", url: "https://store.steampowered.com", icon: Tv },
      { name: "youtube", url: "https://www.youtube.com", icon: Tv },
      { name: "pravda", url: "https://www.pravda.com.ua", icon: Newspaper },
      { name: "wallpapers", url: "https://pivoshenkowallpapers.vercel.app", icon: Bookmark },
    ],
  },
];

export default function HomePage() {
  return (
    <section className="cards-grid" aria-label="Quick links">
      {cards.map((card) => (
        <article key={card.title} className="card">
          <h2>{card.title}</h2>
          <ul>
            {card.links.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.url}>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    <span className="link-left">
                      <Icon className="link-icon" />
                      {link.name}
                    </span>
                    <span className="link-arrow">↗</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </article>
      ))}
    </section>
  );
}
