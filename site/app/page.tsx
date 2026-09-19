import { tabs } from '@/lib/links'
import { ArrowUpRight } from 'lucide-react'
import { HeroBand, PageBody } from 'pivoshenko.ui'

export default function HomePage() {
  const categories = tabs.flatMap((tab) => tab.categories)

  return (
    <>
      <HeroBand
        field="pixels"
        title={
          <>
            <span className="fg-title">pivoshenko</span>
            <span className="fg-muted">.</span>
            <span className="text-accent">startpage</span>
          </>
        }
      />
      <PageBody>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-bg-surface border border-ui rounded overflow-hidden"
            >
              <h3 className="type-label fg-title px-3 py-3 border-b border-ui">
                <span aria-hidden="true" className="text-accent">
                  {'//'}
                </span>{' '}
                {category.name}
              </h3>
              <ul className="p-1 space-y-1">
                {category.links.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full rounded flex items-center justify-between gap-2 px-2 py-2 type-ui fg-secondary hover:bg-bg-raised transition-colors"
                    >
                      {link.name}
                      <ArrowUpRight
                        size={12}
                        strokeWidth={2}
                        aria-hidden="true"
                        className="flex-none fg-muted"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </PageBody>
    </>
  )
}
