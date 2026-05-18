type ProfileSystemFrameProps = {
  imageSrc: string;
  imageAlt?: string;
};

const footerBars = Array.from({ length: 22 }, (_, index) => index);

export const ProfileSystemFrame = ({ imageSrc, imageAlt = "Kung profile" }: ProfileSystemFrameProps) => {
  return (
    <figure className="about-kung-card" aria-label="Kung profile system frame">
      <div className="about-kung-card__header">
        <div className="about-kung-card__header-left">
          <span className="about-kung-card__dot" aria-hidden="true" />
          <span className="about-kung-card__label">Kung Profile</span>
        </div>
        <span className="about-kung-card__dots" aria-hidden="true">.....</span>
      </div>

      <div className="about-kung-card__image-area">
        <img src={imageSrc} alt={imageAlt} loading="lazy" className="about-kung-card__image" />
        <span className="about-kung-card__corner about-kung-card__corner--tl" aria-hidden="true" />
        <span className="about-kung-card__corner about-kung-card__corner--tr" aria-hidden="true" />
        <span className="about-kung-card__corner about-kung-card__corner--br" aria-hidden="true" />
        <span className="about-kung-card__side-text" aria-hidden="true">ID:66-6.00-98:3</span>
        <span className="about-kung-card__red-bar" aria-hidden="true" />
        <span className="about-kung-card__vignette" aria-hidden="true" />
        <span className="about-kung-card__scanline" aria-hidden="true" />
      </div>

      <figcaption className="about-kung-card__footer">
        <div className="about-kung-card__footer-row">
          <div className="about-kung-card__footer-label">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            Data Engineer
          </div>
        </div>

        <div className="about-kung-card__bar" aria-hidden="true">
          {footerBars.map((item) => (
            <span key={item} />
          ))}
        </div>

        <div className="about-kung-card__status">
          System Status: <span>Stable</span>
        </div>
      </figcaption>
    </figure>
  );
};
