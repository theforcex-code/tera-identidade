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
        <span className={`font-neue-montreal text-xl leading-none text-branco md:text-2xl ${className}`}>
          {children}
        </span>
        <span className="font-univers text-[10px] uppercase tracking-[0.28em] text-branco/45">
          {label}
        </span>
      </div>
      <p className={`break-words font-neue-montreal text-base leading-snug text-branco/85 md:text-lg ${className}`}>
        {ALPHA_PAIRS}
      </p>
      <p className={`mt-2 font-neue-montreal text-base tracking-wider text-branco/55 md:text-lg ${className}`}>
        {NUMS}
      </p>
    </div>
  );
}
