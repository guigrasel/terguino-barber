import './Button.css'

function Button({
  as: Component = 'button',
  children,
  className = '',
  type = 'button',
  variant = 'primary',
  ...props
}) {
  const buttonClassName = ['button', `button--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <Component className={buttonClassName} type={Component === 'button' ? type : undefined} {...props}>
      {children}
    </Component>
  )
}

export default Button
