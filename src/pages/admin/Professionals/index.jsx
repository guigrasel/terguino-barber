import { useMemo, useState } from 'react'
import AlertMessage from '../../../components/AlertMessage/index.jsx'
import Button from '../../../components/Button/index.jsx'
import EmptyState from '../../../components/EmptyState/index.jsx'
import Loading from '../../../components/Loading/index.jsx'
import ProfessionalCard from '../../../components/ProfessionalCard/index.jsx'
import ProfessionalForm from '../../../components/ProfessionalForm/index.jsx'
import { useProfessionals } from '../../../hooks/useProfessionals.js'
import './Professionals.css'

function Professionals() {
  const {
    actionId,
    addProfessional,
    editProfessional,
    errorMessage,
    isLoading,
    isSubmitting,
    loadProfessionals,
    professionals,
    successMessage,
    toggleProfessionalStatus,
  } = useProfessionals()
  const [selectedProfessional, setSelectedProfessional] = useState(null)
  const [formVersion, setFormVersion] = useState(0)

  const formInitialValues = useMemo(() => {
    if (!selectedProfessional) {
      return undefined
    }

    return {
      name: selectedProfessional.name,
      workStart: selectedProfessional.workStart,
      workEnd: selectedProfessional.workEnd,
    }
  }, [selectedProfessional])

  const activeProfessionalsCount = professionals.filter(
    (professional) => professional.active,
  ).length

  async function handleSubmitProfessional(professional) {
    if (selectedProfessional) {
      const updatedProfessional = await editProfessional(
        selectedProfessional.id,
        professional,
      )

      if (updatedProfessional) {
        setSelectedProfessional(updatedProfessional)
      }

      return updatedProfessional
    }

    const createdProfessional = await addProfessional(professional)

    if (createdProfessional) {
      setFormVersion((currentVersion) => currentVersion + 1)
    }

    return createdProfessional
  }

  function handleCancelEdit() {
    setSelectedProfessional(null)
    setFormVersion((currentVersion) => currentVersion + 1)
  }

  return (
    <section className="page-shell">
      <header className="page-header">
        <span className="page-eyebrow">Cadastros</span>
        <h1>Profissionais</h1>
        <p>
          Cadastre barbeiros, ajuste expedientes e controle quem aparece no
          fluxo de agendamento.
        </p>
      </header>

      {errorMessage && (
        <AlertMessage title="Erro ao carregar profissionais" type="error">
          {errorMessage}
        </AlertMessage>
      )}

      {successMessage && (
        <AlertMessage title="Atualização concluída" type="success">
          {successMessage}
        </AlertMessage>
      )}

      <div className="professionals-page">
        <section className="page-panel" aria-labelledby="professional-form-title">
          <h2 id="professional-form-title">
            {selectedProfessional ? 'Editar profissional' : 'Novo profissional'}
          </h2>
          <p>
            Defina o nome e o expediente. O horário final precisa ser posterior
            ao início.
          </p>

          <ProfessionalForm
            key={selectedProfessional?.id || `new-${formVersion}`}
            initialValues={formInitialValues}
            isSubmitting={isSubmitting}
            onCancel={selectedProfessional ? handleCancelEdit : undefined}
            onSubmit={handleSubmitProfessional}
            submitLabel={selectedProfessional ? 'Salvar alterações' : 'Cadastrar'}
          />
        </section>

        <section className="page-panel" aria-labelledby="professionals-list-title">
          <div className="professionals-page__list-header">
            <div>
              <h2 id="professionals-list-title">Profissionais cadastrados</h2>
              <p>
                {activeProfessionalsCount} ativos de {professionals.length}{' '}
                cadastrados
              </p>
            </div>

            <Button onClick={loadProfessionals} type="button" variant="secondary">
              Atualizar
            </Button>
          </div>
          {isLoading && <Loading label="Carregando profissionais..." />}

          {!isLoading && professionals.length === 0 && (
            <EmptyState
              title="Nenhum profissional cadastrado"
              description="Cadastre o primeiro profissional para liberar opções no agendamento."
            />
          )}

          {!isLoading && professionals.length > 0 && (
            <div className="professionals-page__list">
              {professionals.map((professional) => (
                <ProfessionalCard
                  key={professional.id}
                  isToggling={actionId === professional.id}
                  onEdit={setSelectedProfessional}
                  onToggleStatus={toggleProfessionalStatus}
                  professional={professional}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </section>
  )
}

export default Professionals