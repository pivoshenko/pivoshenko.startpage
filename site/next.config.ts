import type { NextConfig } from 'next'
import { baseNextConfig } from 'pivoshenko.ui/next/config'

// This site is a browser new-tab/startpage and is meant to be embedded in an
// iframe by custom new-tab extensions. The shared baseNextConfig sets
// `X-Frame-Options: DENY`, which blocks all framing — so strip just that header
// here while inheriting every other shared security header.
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
