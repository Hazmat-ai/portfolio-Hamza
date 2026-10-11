export function ScrollHeading({
  children,
  id,
}: {
  children: string;
  id?: string;
}) {
  return <h2 id={id}>{children}</h2>;
}
