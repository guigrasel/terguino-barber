import './AlertMessage.css'

function AlertMessage({ children, title, type = 'info' }) {
  const role = type === 'error' ? 'alert' : 'status'

  return (
    <div className={`alert-message alert-message--${type}`} role={role}>
      {title && <strong>{title}</strong>}
      {children && <p>{children}</p>}
    </div>
  )
}

export default AlertMessage
