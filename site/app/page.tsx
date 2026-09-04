import { tabs } from '@/lib/links'
import {
  Briefcase,
  Code2,
  Link2,
  type LucideIcon,
  Newspaper,
  User,
  Users,
} from 'lucide-react'
import { Card } from 'pivoshenko.ui'

export default function HomePage() {
  const categories = tabs.flatMap((tab) => tab.categories)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {categories.map((category) => (
        <Card key={category.name} className="overflow-hidden">
          <h3 className="type-label fg-subtle px-3 py-3 border-b border-ui flex items-center gap-2">
            <CategoryIcon name={category.name} />
            {category.name}
          </h3>
          <ul className="p-1 space-y-1">
            {category.links.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded flex items-center justify-between px-2 py-2 type-ui fg-secondary hover:bg-bg-raised transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span>{link.name}</span>
                  </span>
                  <span className="type-meta fg-muted">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  )
}

function CategoryIcon({ name }: { name: string }) {
  const Icon = getCategoryIcon(name)
  return <Icon aria-hidden="true" className="w-3.5 h-3.5" />
}

function getCategoryIcon(name: string): LucideIcon {
  switch (name) {
    case 'me':
      return User
    case 'workspace':
      return Briefcase
    case 'platforms':
      return Briefcase
    case 'development':
      return Code2
    case 'tech lead blogs':
      return Users
    case 'tech blogs':
      return Newspaper
    default:
      return Link2
  }
}
