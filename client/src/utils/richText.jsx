/** Renders markdown-style **bold** segments inside plain strings. */
export function renderRichText(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold text-navy-deep">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
