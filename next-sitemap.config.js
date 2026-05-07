/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.PRODUCTION_FRONTEND_URL || 'https://example.com',
  generateRobotsTxt: false,
  outDir: './public',
}

export default config
