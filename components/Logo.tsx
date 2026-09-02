export function Logo({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/pkb-logo.png"
      alt="Logo Partai Kebangkitan Bangsa"
      width={size}
      height={size}
      className={`shrink-0 rounded-full ${className}`}
      draggable={false}
    />
  );
}
