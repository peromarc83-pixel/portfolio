import './Button.css'

/**
 * Bouton polyvalent : rendu en <a> si `href` est fourni, sinon en <button>.
 * variant: 'primary' | 'accent' | 'ghost'
 */
function Button({ variant = 'primary', href, className = '', children, ...rest }) {
  const classes = ['btn', `btn--${variant}`, className].filter(Boolean).join(' ')

  if (href) {
    const isExternal = /^https?:\/\//.test(href)
    return (
      <a
        href={href}
        className={classes}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}

export default Button
