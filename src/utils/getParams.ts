function getParam(urlString: string): string | null {
  try {
    const url = new URL(urlString);
    const segments = url.pathname.split("/").filter(Boolean);
    return segments[segments.length - 1] || null;
  } catch {
    return null;
  }
}
