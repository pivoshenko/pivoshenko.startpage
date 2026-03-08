import { tabs } from '@/lib/links'

export default function HomePage() {
  const categories = tabs.flatMap((tab) => tab.categories)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {categories.map((category) => (
        <article
          key={category.name}
          className="border border-ui bg-white dark:bg-stone-950"
        >
          <h3 className="type-label fg-subtle px-3 py-3 border-b border-ui flex items-center gap-2">
            <span aria-hidden="true">{getCategoryIcon(category.name)}</span>
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
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="w-5 h-5 rounded-sm border border-ui inline-flex items-center justify-center type-meta fg-muted"
                    >
                      {link.name.charAt(0).toUpperCase()}
                    </span>
                    <span>{link.name}</span>
                  </span>
                  <span className="type-meta fg-muted">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}

function getCategoryIcon(name: string): string {
  switch (name) {
    case 'bookmarks':
      return '🔖'
    case 'workspace':
      return '💼'
    case 'media':
      return '📰'
    case 'development':
      return '💻'
    case 'challenges':
      return '🏁'
    case 'resources':
      return '📚'
    case 'social':
      return '💬'
    case 'gaming':
      return '🎮'
    case 'video':
      return '🎬'
    default:
      return '•'
  }
}
