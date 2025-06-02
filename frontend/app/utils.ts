
export function getIconPath(artwork: string): string {
  // Remove existing extension if any
  const base_name = artwork.replace(/\.[^/.]+$/, "");
  return `images/icons/${base_name}.webp`;
}