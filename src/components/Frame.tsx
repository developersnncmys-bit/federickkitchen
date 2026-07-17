import { clsx } from "@/lib/clsx";
import ParallaxImage from "@/components/ParallaxImage";

/**
 * Image panel used across the whole site. Give it `src` and it renders a real
 * photo (with a soft dark scrim so overlaid text stays readable); leave `src`
 * off and it falls back to an art-directed gradient — handy for any spot that
 * doesn't have a photo yet. Set `parallax` to have the photo drift and zoom
 * against the scroll for a more premium, layered feel.
 */
export default function Frame({
  tone = "from-[#efe6d4] via-[#e4d8bf] to-[#d8c9a8]",
  src,
  alt = "",
  label,
  position = "center",
  scrim = true,
  parallax = false,
  className,
  imgClassName,
  children,
}: {
  tone?: string;
  src?: string;
  alt?: string;
  label?: string;
  position?: string;
  scrim?: boolean;
  parallax?: boolean;
  className?: string;
  imgClassName?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "grain relative overflow-hidden bg-gradient-to-br",
        !src && tone,
        className,
      )}
    >
      {src ? (
        <>
          {parallax ? (
            <ParallaxImage
              src={src}
              alt={alt}
              imgClassName={clsx(imgClassName)}
            />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={src}
              alt={alt}
              loading="lazy"
              className={clsx(
                "absolute inset-0 h-full w-full object-cover",
                imgClassName,
              )}
              style={{ objectPosition: position }}
            />
          )}
          {scrim && (
            <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
          )}
        </>
      ) : (
        <>
          {/* Soft light source, so the panel reads as a lit scene not a swatch */}
          <div className="absolute -top-1/3 left-1/4 h-[120%] w-2/3 rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(111,90,60,0.22),transparent_65%)]" />
        </>
      )}

      {label && !src ? (
        <span className="eyebrow absolute bottom-4 left-4 z-10 text-cream/35">
          {label}
        </span>
      ) : null}

      {children}
    </div>
  );
}
