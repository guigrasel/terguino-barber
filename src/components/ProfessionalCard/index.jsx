import Button from '../Button/index.jsx'
import './ProfessionalCard.css'

function ProfessionalCard({
  isToggling = false,
  onEdit,
  onToggleStatus,
  professional,
}) {
  const statusLabel = professional.active ? 'Ativo' : 'Inativo'
  const toggleLabel = professional.active ? 'Inativar' : 'Ativar'

  return (
    <article className="professional-card">
      <div>
        <div className="professional-card__title-row">
          <h2>{professional.name}</h2>
          <span
            className={`professional-card__status ${
              professional.active
                ? 'professional-card__status--active'
                : 'professional-card__status--inactive'
            }`}
          >
            {statusLabel}
          </span>
        </div>

        <p>
          Expediente: {professional.workStart} as {professional.workEnd}
        </p>
      </div>

      <div className="professional-card__actions">
        <Button onClick={() => onEdit(professional)} type="button" variant="secondary">
          Editar
        </Button>
        <Button
          disabled={isToggling}
          onClick={() => onToggleStatus(professional)}
          type="button"
          variant={professional.active ? 'secondary' : 'primary'}
        >
          {isToggling ? 'Atualizando...' : toggleLabel}
        </Button>
      </div>
    </article>
  )
}

export default ProfessionalCard