export type LinkItem = { name: string; url: string }
export type Category = { name: string; links: LinkItem[] }
export type WorkspaceTab = { name: string; categories: Category[] }

export const tabs: WorkspaceTab[] = [
  {
    name: 'myself',
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
          { name: 'gmail', url: 'https://mail.google.com' },
          { name: 'calendar', url: 'https://calendar.google.com' },
          { name: 'sheets', url: 'https://docs.google.com/spreadsheets' },
          { name: 'drive', url: 'https://drive.google.com/drive/home' },
        ],
      },
      {
        name: 'media',
        links: [
          { name: 'pravda', url: 'https://www.pravda.com.ua' },
          { name: 'mil.in.ua', url: 'https://mil.in.ua' },
          { name: 'kutok', url: 'https://kutok.io' },
          { name: 'grnt', url: 'https://grnt.media' },
        ],
      },
    ],
  },
  {
    name: 'dev',
    categories: [
      {
        name: 'development',
        links: [
          { name: 'github', url: 'https://github.com' },
          { name: 'stackoverflow', url: 'https://stackoverflow.com' },
          { name: 'motherduck', url: 'https://app.motherduck.com' },
          { name: 'colab', url: 'https://colab.research.google.com' },
        ],
      },
      {
        name: 'challenges',
        links: [
          { name: 'kaggle', url: 'https://www.kaggle.com' },
          { name: 'leetcode', url: 'https://leetcode.com' },
          { name: 'exercism', url: 'https://exercism.org' },
          { name: 'aoc', url: 'https://adventofcode.com' },
        ],
      },
      {
        name: 'resources',
        links: [
          { name: 'dou', url: 'https://dou.ua' },
          { name: 'hackernews', url: 'https://news.ycombinator.com' },
          {
            name: 'uber engineering',
            url: 'https://www.uber.com/en-GB/blog/london/engineering',
          },
        ],
      },
    ],
  },
  {
    name: 'chill',
    categories: [
      {
        name: 'social',
        links: [
          { name: 'telegram', url: 'https://web.telegram.org' },
          { name: 'facebook', url: 'https://www.facebook.com' },
          { name: 'reddit', url: 'https://www.reddit.com/r/unixporn' },
        ],
      },
      {
        name: 'gaming',
        links: [
          { name: 'steam', url: 'https://store.steampowered.com' },
          { name: 'epic', url: 'https://store.epicgames.com' },
          { name: 'nintendo', url: 'https://store.nintendo.co.uk' },
        ],
      },
      {
        name: 'video',
        links: [
          { name: 'anilist', url: 'https://anilist.co/home' },
          { name: 'youtube', url: 'https://www.youtube.com' },
          { name: 'patreon', url: 'https://www.patreon.com' },
          { name: 'kyivstar tv', url: 'https://tv.kyivstar.ua' },
        ],
      },
    ],
  },
]
