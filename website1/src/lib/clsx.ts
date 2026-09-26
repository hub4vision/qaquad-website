// Tiny dependency-free class-name joiner so we don't need to add the `clsx`
// or `classnames` package just for conditional class strings.
export function clsx(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}
