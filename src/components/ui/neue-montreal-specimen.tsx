import type { ReactNode } from "react";

const ALPHA_PAIRS =
  "Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz";
const NUMS = "0123456789";

export function NeueMontrealSpecimen({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-7">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <span className="font-neue-montreal-mono text-[10px] uppercase tracking-[0.18em] text-branco/45">
          {label}
        </span>
      </div>
      <p className={`break-words font-neue-montreal text-2xl leading-[0.95] tracking-[-0.03em] text-branco/90 md:text-4xl ${className}`}>
        {ALPHA_PAIRS}
      </p>
      <p className={`mt-4 font-neue-montreal text-xl tracking-[-0.02em] text-branco/60 md:text-3xl ${className}`}>
        {NUMS}
      </p>
    </div>
  );
}
