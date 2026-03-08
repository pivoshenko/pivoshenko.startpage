import { tabs } from '@/lib/links'

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="type-heading fg-primary">Quick Links</h1>
        <p className="type-body fg-body max-w-3xl">
          A focused startpage for daily browsing, development, and media.
        </p>
      </section>

      <div className="space-y-8">
        {tabs.map((tab) => (
          <section key={tab.name} className="space-y-3">
            <h2 className="type-label fg-muted">{tab.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {tab.categories.map((category) => (
                <article
                  key={category.name}
                  className="border border-ui bg-white dark:bg-stone-950"
                >
                  <h3 className="type-label fg-subtle px-3 py-3 border-b border-ui">
                    {category.name}
                  </h3>
                  <ul className="p-1 space-y-1">
                    {category.links.map((link) => (
                      <li key={link.url}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-between px-2 py-2 type-ui fg-secondary hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors"
                        >
                          <span>{link.name}</span>
                          <span className="type-meta fg-muted">↗</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
