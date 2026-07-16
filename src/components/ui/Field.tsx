import { clsx } from "@/lib/clsx";

const base =
  "w-full rounded-lg border border-cream/15 bg-ink/60 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/40 outline-none transition-colors focus:border-gold/60 focus:ring-1 focus:ring-gold/30 disabled:opacity-50";

export function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="eyebrow mb-2.5 block text-cream-dim/60">{label}</span>
      {children}
      {hint && <span className="mt-2 block text-xs text-cream-dim/50">{hint}</span>}
    </label>
  );
}

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={clsx(base, className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={clsx(base, "resize-none", className)} {...props} />;
}

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={clsx(base, "appearance-none pr-10", className)} {...props}>
      {children}
    </select>
  );
}
