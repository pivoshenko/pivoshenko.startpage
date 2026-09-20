import type { MetadataRoute } from 'next'

const url = 'https://startpage.pivoshenko.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    {
      url: url,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
