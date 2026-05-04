/**
 * GitHub media still lives under folder `normal` while the site uses slug `ads`.
 * Try `ads` first (server maps to `normal` when supported), then legacy `normal`.
 */
export function mediaListApiUrls(category: string): string[] {
  return category === 'ads'
    ? ['/api/media/ads', '/api/media/normal']
    : [`/api/media/${category}`];
}
