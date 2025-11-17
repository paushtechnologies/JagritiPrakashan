/**
 * Resolve asset paths relative to the app's base URL
 * Works with both dev server and GitHub Pages with subdirectory
 */
export const getAssetPath = (path) => {
  const base = import.meta.env.BASE_URL;
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};
