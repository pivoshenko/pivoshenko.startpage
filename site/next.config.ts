import type { NextConfig } from 'next'
import { baseNextConfig } from 'pivoshenko.ui/next/config'

// Custom new-tab extensions embed this startpage in an iframe, which the shared
// `X-Frame-Options: DENY` blocks. Strip that one header, inherit the rest
const config: NextConfig = {
  ...baseNextConfig,
  async headers() {
    const base = (await baseNextConfig.headers?.()) ?? []
    return base.map((entry) => ({
      ...entry,
      headers: entry.headers.filter((h) => h.key !== 'X-Frame-Options'),
    }))
  },
}

export default config
