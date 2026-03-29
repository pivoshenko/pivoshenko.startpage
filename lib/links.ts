export type LinkItem = { name: string; url: string }
export type Category = { name: string; links: LinkItem[] }
export type WorkspaceTab = { name: string; categories: Category[] }

export const tabs: WorkspaceTab[] = [
  {
    name: 'row-1',
    categories: [
      {
        name: 'bookmarks',
        links: [
          { name: 'raindrop', url: 'https://app.raindrop.io' },
          {
            name: 'musicforprogramming',
            url: 'https://musicforprogramming.net',
          },
        ],
      },
      {
        name: 'workspace',
        links: [
          { name: 'linear', url: 'https://linear.app' },
          { name: 'gmail', url: 'https://mail.google.com' },
          { name: 'calendar', url: 'https://calendar.google.com' },
          { name: 'sheets', url: 'https://docs.google.com/spreadsheets' },
          { name: 'drive', url: 'https://drive.google.com/drive/home' },
        ],
      },
      {
        name: 'platforms',
        links: [
          { name: 'cloudflare', url: 'https://dash.cloudflare.com' },
          { name: 'hetzner', url: 'https://console.hetzner.com' },
          { name: 'tailscale', url: 'https://login.tailscale.com' },
          { name: 'motherduck', url: 'https://app.motherduck.com' },
          { name: 'vercel', url: 'https://vercel.com' },
        ],
      },
    ],
  },
  {
    name: 'row-2',
    categories: [
      {
        name: 'development',
        links: [
          { name: 'github', url: 'https://github.com' },
          { name: 'kaggle', url: 'https://www.kaggle.com' },
          { name: 'leetcode', url: 'https://leetcode.com' },
          { name: 'exercism', url: 'https://exercism.org' },
        ],
      },
      {
        name: 'tech leads',
        links: [
          {
            name: 'pragmaticengineer',
            url: 'https://blog.pragmaticengineer.com',
          },
        ],
      },
      {
        name: 'tech blogs',
        links: [
          { name: 'dou', url: 'https://dou.ua' },
          { name: 'hackernews', url: 'https://news.ycombinator.com' },
          {
            name: 'uber engineering',
            url: 'https://www.uber.com/en-GB/blog/london/engineering',
          },
          {
            name: 'netflix techblog',
            url: 'https://netflixtechblog.com',
          },
          {
            name: 'spotify engineering',
            url: 'https://engineering.atspotify.com',
          },
        ],
      },
    ],
  },
]
