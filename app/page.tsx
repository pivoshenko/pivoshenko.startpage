"use client";

import { useEffect, useMemo, useState } from "react";

import { tabs } from "@/lib/links";

export default function HomePage() {
  const [tabIdx, setTabIdx] = useState(0);
  const activeTab = tabs[tabIdx];
  const [now, setNow] = useState("");

  useEffect(() => {
    const update = () => {
      setNow(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    };

    update();
    const id = window.setInterval(update, 30000);
    return () => window.clearInterval(id);
  }, []);

  const totalLinks = useMemo(
    () => activeTab.categories.reduce((acc, category) => acc + category.links.length, 0),
    [activeTab],
  );

  return (
    <main className="sp-shell">
      <header className="topbar">
        <div className="traffic-lights" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        <p className="topbar-title">pivoshenko.startpage</p>
        <a href="https://pivoshenko.dev" target="_blank" rel="noreferrer" className="topbar-link">
          pivoshenko.dev
        </a>
      </header>

      <section className="command-row">
        <div className="command-palette">jump to link... (cmd+k)</div>
        <div className="meta">
          <span>{activeTab.name}</span>
          <span>{totalLinks} links</span>
          <span>{now}</span>
        </div>
      </section>

      <nav className="workspace-tabs" aria-label="Workspaces">
        {tabs.map((tab, idx) => (
          <button
            key={tab.name}
            className={idx === tabIdx ? "workspace-tab active" : "workspace-tab"}
            onClick={() => setTabIdx(idx)}
            type="button"
          >
            {tab.name}
          </button>
        ))}
      </nav>

      <section className="category-grid" aria-label="Categories">
        {activeTab.categories.map((category) => (
          <article className="category-card" key={category.name}>
            <h2>{category.name}</h2>
            <ul>
              {category.links.map((link) => (
                <li key={link.url}>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.name}
                    <span className="arrow">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}
