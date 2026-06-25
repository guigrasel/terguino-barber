import Button from '../Button/index.jsx'
import './Modal.css'

function Modal({ children, footer, isOpen, onClose, title }) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <header className="modal__header">
          <h2 id="modal-title">{title}</h2>
          <Button aria-label="Fechar modal" onClick={onClose} variant="secondary">
            Fechar
          </Button>
        </header>
        <div className="modal__body">{children}</div>
        {footer && <footer className="modal__footer">{footer}</footer>}
      </section>
    </div>
  )
}

export default Modal
