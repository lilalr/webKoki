export const imageAliasMap: Record<string, string> = {
  "/image/roti": "/images/roti-selai-coklat.png",
};

export function resolveImagePath(src?: string): string | undefined {
  if (!src) return undefined;
  if (src.startsWith("/image/")) {
    return imageAliasMap[src] ?? src.replace("/image/", "/images/");
  }
  return src;
}
