"use client";

import { useMemo, useState } from "react";

import { tabs } from "@/lib/links";

export default function HomePage() {
  const [tabIdx, setTabIdx] = useState(0);
  const activeTab = tabs[tabIdx];

  const now = useMemo(
    () =>
      new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    [],
  );

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand">
          <p className="brand-title">pivoshenko.startpage</p>
          <p className="brand-subtitle">morok theme</p>
        </div>

        <nav className="tabs" aria-label="Workspaces">
          {tabs.map((tab, idx) => (
            <button
              key={tab.name}
              className={idx === tabIdx ? "tab active" : "tab"}
              onClick={() => setTabIdx(idx)}
              type="button"
            >
              {tab.name}
            </button>
          ))}
        </nav>

        <div className="status">
          <p>{now}</p>
          <a href="https://startpage.pivoshenko.dev" target="_blank" rel="noreferrer">
            startpage.pivoshenko.dev
          </a>
        </div>
      </aside>

      <section className="workspace">
        <header className="workspace-header">
          <h1>{activeTab.name}</h1>
          <p>Minimal links. Fast access. No clutter.</p>
        </header>

        <div className="grid">
          {activeTab.categories.map((category) => (
            <article className="panel" key={category.name}>
              <h2>{category.name}</h2>
              <ul>
                {category.links.map((link) => (
                  <li key={link.url}>
                    <a href={link.url} target="_blank" rel="noreferrer">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
