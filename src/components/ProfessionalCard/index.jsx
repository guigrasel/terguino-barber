import Button from '../Button/index.jsx'
import './ProfessionalCard.css'

function ProfessionalCard({
  isSelected = false,
  isToggling = false,
  onEdit,
  onSelect,
  onToggleStatus,
  professional,
}) {
  const statusLabel = professional.active ? 'Ativo' : 'Inativo'
  const toggleLabel = professional.active ? 'Inativar' : 'Ativar'

  return (
    <article
      className={`professional-card ${
        isSelected ? 'professional-card--selected' : ''
      }`}
    >
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
        {onSelect ? (
          <Button onClick={() => onSelect(professional)} type="button">
            {isSelected ? 'Selecionado' : 'Selecionar'}
          </Button>
        ) : (
          <>
            <Button
              onClick={() => onEdit(professional)}
              type="button"
              variant="secondary"
            >
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
          </>
        )}
      </div>
    </article>
  )
}

export default ProfessionalCard