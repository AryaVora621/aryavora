/**
 * Extracts WikiLinks in the format [[Note Title]] from a markdown string.
 */
export const extractLinks = (content: string): string[] => {
  const linkRegex = /\[\[(.*?)\]\]/g;
  const links: string[] = [];
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    // match[1] contains the actual text inside the brackets
    const linkTitle = match[1].trim();
    if (linkTitle) {
      links.push(linkTitle);
    }
  }

  // Return unique links, case-sensitive (or insensitive depending on your design)
  // Let's go case-insensitive for better UX, but preserve original casing for search.
  // We'll return unique titles.
  return Array.from(new Set(links));
};

export const normalizeTitle = (title: string): string => {
  return title.toLowerCase().trim();
};
