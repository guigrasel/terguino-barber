import './AlertMessage.css'

function AlertMessage({ children, title, type = 'info' }) {
  return (
    <div className={`alert-message alert-message--${type}`} role="status">
      {title && <strong>{title}</strong>}
      {children && <p>{children}</p>}
    </div>
  )
}

export default AlertMessage
