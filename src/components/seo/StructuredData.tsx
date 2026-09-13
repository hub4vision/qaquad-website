/**
 * Renders a JSON-LD <script> tag from a plain object. Kept as a tiny
 * dedicated component (rather than inlining <script> everywhere) so every
 * structured-data block is escaped the same safe way.
 */
export function StructuredData({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
