import { tabs } from '@/lib/links'
import {
  Briefcase,
  Code2,
  Link2,
  type LucideIcon,
  Newspaper,
  Server,
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <section
              key={category.name}
              className="relative rounded-lg border border-dashed border-ui p-4"
            >
              <CategoryIcon name={category.name} />
              <h3 className="type-heading fg-subtle uppercase flex items-center gap-2">
                {category.name}
                <span className="rounded-full bg-bg-raised fg-subtle px-1.5 text-[11px] leading-[18px] normal-case">
                  {category.links.length}
                </span>
              </h3>
              <ul className="pt-1.5">
                {category.links.map((link) => (
                  <li key={link.url} className="group relative pl-5">
                    {/* the trunk and its elbow are drawn rather than typed, so
                        the rule lands on the pixel grid at any zoom. the trunk
                        is split at the elbow so hovering a link tints the run
                        down to it and leaves the stretch below untouched */}
                    <span
                      aria-hidden="true"
                      className="absolute left-1 top-0 h-3.5 w-px bg-border-subtle transition-colors duration-fast group-hover:bg-accent group-focus-within:bg-accent [li:has(~li:hover)_&]:bg-accent [li:has(~li:focus-within)_&]:bg-accent"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute left-1 top-3.5 -bottom-px w-px bg-border-subtle transition-colors duration-fast [li:has(~li:hover)_&]:bg-accent [li:has(~li:focus-within)_&]:bg-accent group-last:hidden"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute left-1 top-3.5 h-px w-[10px] bg-border-subtle transition-colors duration-fast group-hover:bg-accent group-focus-within:bg-accent [li:has(~li:hover)_&]:bg-accent [li:has(~li:focus-within)_&]:bg-accent"
                    />
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring block rounded py-1 type-ui fg-subtle hover-primary focus-visible:text-fg-default transition-colors duration-fast"
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
    /* the filled square masks the dashed border it straddles, so the card's
       top and right rules run into the icon instead of behind it */
    <span className="absolute right-0 top-0 flex -translate-y-1/2 translate-x-1/2 rounded-sm border border-accent bg-accent p-1">
      <Icon
        size={16}
        strokeWidth={2}
        aria-hidden="true"
        className="text-bg-canvas"
      />
    </span>
  )
}

function getCategoryIcon(name: string): LucideIcon {
  switch (name) {
    case 'me':
      return User
    case 'workspace':
      return Briefcase
    case 'platforms':
      return Server
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
