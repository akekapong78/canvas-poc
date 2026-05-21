// Prefix public asset paths with basePath when deployed to gh-pages.
// NODE_ENV=production is always set during `next build`, including in CI.
const BASE = process.env.NODE_ENV === 'production' ? '/canvas-poc' : '';
export const assetPath = (path: string) => `${BASE}${path}`;
