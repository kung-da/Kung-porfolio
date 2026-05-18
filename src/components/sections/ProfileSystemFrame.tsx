type ProfileSystemFrameProps = {
  imageSrc: string;
  imageAlt?: string;
};

const barcodeLines = [10, 18, 7, 22, 12, 16, 8, 20, 11, 15, 6, 19];

export const ProfileSystemFrame = ({ imageSrc, imageAlt = "Kung profile" }: ProfileSystemFrameProps) => {
  return (
    <figure className="profile-system-frame" aria-label="Kung profile system frame">
      <div className="profile-system-frame__header">
        <div className="flex min-w-0 items-center gap-3">
          <span className="profile-system-frame__status" aria-hidden="true" />
          <span className="truncate font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-100/85">
            Kung Profile
          </span>
          <span className="h-px w-16 bg-gradient-to-r from-red-500/80 to-transparent sm:w-24" aria-hidden="true" />
        </div>

        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-1 w-1 bg-red-400/70" />
          <span className="h-1 w-4 bg-red-500/35" />
          <span className="h-1 w-1 bg-slate-100/45" />
        </div>
      </div>

      <div className="profile-system-frame__body">
        <div className="profile-system-frame__vertical-id">ID: KG-9701-DEV</div>
        <img src={imageSrc} alt={imageAlt} loading="lazy" className="profile-system-frame__image" />
        <div className="profile-system-frame__image-shade" aria-hidden="true" />
        <div className="profile-system-frame__noise" aria-hidden="true" />
        <div className="profile-system-frame__scan-line" aria-hidden="true" />

        <span className="profile-system-frame__bracket profile-system-frame__bracket--tl" aria-hidden="true" />
        <span className="profile-system-frame__bracket profile-system-frame__bracket--tr" aria-hidden="true" />
        <span className="profile-system-frame__bracket profile-system-frame__bracket--bl" aria-hidden="true" />
        <span className="profile-system-frame__bracket profile-system-frame__bracket--br" aria-hidden="true" />
      </div>

      <figcaption className="profile-system-frame__footer">
        <div className="flex min-w-0 items-center gap-3">
          <span className="h-2 w-2 bg-red-500/70" aria-hidden="true" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-200/75">
            Data Engineer
          </span>
        </div>

        <div className="profile-system-frame__barcode" aria-hidden="true">
          {barcodeLines.map((height, index) => (
            <span key={`${height}-${index}`} style={{ height }} />
          ))}
        </div>

        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
          System Status: <span className="text-red-400">Stable</span>
        </div>
      </figcaption>
    </figure>
  );
};
