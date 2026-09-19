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
        lead="A minimal and fast personal startpage with curated quick links for daily browsing, development, and media."
      />
      <PageBody>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {categories.map((category) => (
            <section
              key={category.name}
              className="rounded-lg border border-dashed border-ui p-4"
            >
              <h3 className="type-heading fg-subtle uppercase flex items-center gap-2">
                <CategoryIcon name={category.name} />
                {category.name}
              </h3>
              <ul className="pt-1.5">
                {category.links.map((link) => (
                  <li key={link.url} className="group relative pl-5">
                    {/* the trunk and its elbow are drawn rather than typed, so
                        the rule lands on the pixel grid at any zoom */}
                    <span
                      aria-hidden="true"
                      className="absolute left-1 top-0 -bottom-px w-px bg-border-subtle transition-colors duration-fast group-hover:bg-accent group-focus-within:bg-accent [li:has(~li:hover)_&]:bg-accent [li:has(~li:focus-within)_&]:bg-accent group-last:bottom-auto group-last:h-3.5"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute left-[5px] top-3.5 h-px w-[9px] bg-border-subtle transition-colors duration-fast group-hover:bg-accent group-focus-within:bg-accent [li:has(~li:hover)_&]:bg-accent [li:has(~li:focus-within)_&]:bg-accent"
                    />
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring block rounded py-1 type-ui fg-secondary hover-primary transition-colors duration-fast"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </PageBody>
    </>
  )
}

function CategoryIcon({ name }: { name: string }) {
  const Icon = getCategoryIcon(name)
  return (
    <Icon
      size={16}
      strokeWidth={2}
      aria-hidden="true"
      className="flex-none text-accent"
    />
  )
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
