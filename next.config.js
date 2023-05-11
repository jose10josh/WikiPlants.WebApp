const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const config = {
  future: {
    webpack5: true,
  },
  env: {
    NEXT_PUBLIC_SPACE_ID: 'im6n620pc0uf',
    NEXT_PUBLIC_ACCESS_TOKEN: 'WlTO2Q3ChkXo0HB3TeVGudgZ2wnDBvuWn_PBZBuyzGI',
  },
}

module.exports = withBundleAnalyzer(config)
