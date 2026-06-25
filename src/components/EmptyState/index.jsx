import './EmptyState.css'

function EmptyState({ action, description, title }) {
  return (
    <section className="empty-state">
      <div className="empty-state__mark" aria-hidden="true" />
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {action && <div className="empty-state__action">{action}</div>}
    </section>
  )
}

export default EmptyState
