export function ScrollHeading({
  children,
  id,
}: {
  children: string;
  id?: string;
}) {
  return (
    <h2 id={id} data-scroll-heading aria-label={children}>
      {children.split(" ").map((word, i) => (
        <span className="word-mask" key={i} aria-hidden="true">
          <span className="word-reveal">{word}</span>
        </span>
      ))}
    </h2>
  );
}
