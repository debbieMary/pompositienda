import CustomCard from "./CustomCard";
import CustomImage from "./CustomImage";
import CTALink from "./CTALink";
import ButtonLink from "./ButtonLink";

export default function GenericItem({
  imageSrc,
  imageAlt,
  topLeftBadge,
  topRightText,
  title,
  subtitle,
  description,
  price,
  originalPrice,
  discountBadge,
  onCTAClick,
  ctaText,
  ctaLink,
  socialLinks = [],
  location,
  phone,
  stock,
  children,
}) {
  return (
    <CustomCard>
      <CustomImage imageSrc={imageSrc} imageAlt={imageAlt} />

      <div className="card-body d-flex flex-column bg-white p-3">
        {/* Badges superiores */}
        {(topLeftBadge || topRightText) && (
          <div className="d-flex justify-content-between mb-2">
            {topLeftBadge && (
              <span className="badge" style={topLeftBadge.style}>
                {topLeftBadge.content}
              </span>
            )}
            {topRightText && (
              <span style={topRightText.style}>{topRightText.content}</span>
            )}
          </div>
        )}

        {/* Título */}
        {title && <h4 style={{ color: "var(--pomp-turquesa)" }}>{title}</h4>}
        {subtitle && <h6 className="text-secondary">{subtitle}</h6>}
        {/*Stock  */}

        {stock && stock.content !== null && (
          <div style={stock.style}>
            {stock.icon && (
              <stock.icon
                style={{ marginRight: 6 }}
                size={stock.iconSize || 18}
              />
            )}
            {stock.content}
          </div>
        )}

        {/* Descripción */}
        {description && (
          <p className="text-muted mb-4 flex-grow-1">{description}</p>
        )}

        {/* Children para añadir cosas personalizadas como íconos o badges */}
        {children}

        {/* Precios */}
        {price && (
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <span
                className="fw-bold"
                style={{
                  fontSize: "1.2rem",
                  color: "var(--pomp-salmon-oscuro)",
                }}
              >
                Bs. {price.toFixed(2)}
              </span>
              {originalPrice && (
                <span
                  className="text-decoration-line-through ms-2"
                  style={{ color: "var(--pomp-plomo-oscuro)" }}
                >
                   Bs. {originalPrice}
                </span>
              )}
            </div>

            {discountBadge && (
              <span className="badge" style={discountBadge.style}>
                {discountBadge.icon && <discountBadge.icon className="me-1" />}
                {discountBadge.content}
              </span>
            )}
          </div>
        )}

        {/* CTA: botón de acción o link */}
        {onCTAClick && ctaText && (
          <CTALink
            className="btn pomp-btn-primary me-2r mt-4 w-100"
            onClick={onCTAClick}
          >
            {ctaText}
          </CTALink>
        )}

        {/* Redes sociales */}
        {socialLinks.length > 0 && (
          <div className="d-flex gap-2 mt-3">
            {socialLinks.map(({ href, icon: SocialIcon, className }, index) => (
              <a
                key={index}
                className={`btn-icon ${className}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {SocialIcon}
              </a>
            ))}
          </div>
        )}

        {/* Ubicación y teléfono */}
        <div className="row mt-2">
          {location && (
            <p className="mb-2 text-muted">
              {location.icon && <location.icon className="me-1 text-primary" />}
              {location.text}
            </p>
          )}
          {phone && (
            <p className="mb-2 text-muted">
              {phone.icon && <phone.icon className="me-1 text-secondary" />}
              <a
                href={`tel:${phone.text}`}
                className="text-muted text-decoration-none"
              >
                {phone.text}
              </a>
            </p>
          )}

          {ctaLink && (
            <ButtonLink className="mt-4 w-100" to={ctaLink}>
              {ctaText}
            </ButtonLink>
          )}
        </div>
      </div>
    </CustomCard>
  );
}
