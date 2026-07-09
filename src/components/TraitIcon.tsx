export function TraitIcon({ id, className }: { id: string; className?: string }) {
  return (
    <span
      className={className}
      style={{
        WebkitMaskImage: `url(/icons/${id}.png)`,
        maskImage: `url(/icons/${id}.png)`,
      }}
      aria-hidden="true"
    />
  );
}
