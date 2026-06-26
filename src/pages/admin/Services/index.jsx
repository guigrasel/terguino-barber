import { useMemo, useState } from 'react'
import AlertMessage from '../../../components/AlertMessage/index.jsx'
import Button from '../../../components/Button/index.jsx'
import EmptyState from '../../../components/EmptyState/index.jsx'
import Loading from '../../../components/Loading/index.jsx'
import ServiceCard from '../../../components/ServiceCard/index.jsx'
import ServiceForm from '../../../components/ServiceForm/index.jsx'
import { useServices } from '../../../hooks/useServices.js'
import './Services.css'

function Services() {
  const {
    actionId,
    addService,
    editService,
    errorMessage,
    isLoading,
    isSubmitting,
    loadServices,
    services,
    successMessage,
    toggleServiceStatus,
  } = useServices()
  const [selectedService, setSelectedService] = useState(null)
  const [formVersion, setFormVersion] = useState(0)

  const formInitialValues = useMemo(() => {
    if (!selectedService) {
      return undefined
    }

    return {
      durationMinutes: selectedService.durationMinutes,
      name: selectedService.name,
      price: selectedService.price,
    }
  }, [selectedService])

  const activeServicesCount = services.filter((service) => service.active).length

  async function handleSubmitService(service) {
    if (selectedService) {
      const updatedService = await editService(selectedService.id, service)

      if (updatedService) {
        setSelectedService(updatedService)
      }

      return updatedService
    }

    const createdService = await addService(service)

    if (createdService) {
      setFormVersion((currentVersion) => currentVersion + 1)
    }

    return createdService
  }

  function handleCancelEdit() {
    setSelectedService(null)
    setFormVersion((currentVersion) => currentVersion + 1)
  }

  return (
    <section className="page-shell">
      <header className="page-header">
        <span className="page-eyebrow">Cadastros</span>
        <h1>Serviços</h1>
        <p>
          Cadastre serviços, ajuste preços e controle o que aparece no fluxo de
          agendamento.
        </p>
      </header>

      {errorMessage && (
        <AlertMessage title="Erro ao carregar serviços" type="error">
          {errorMessage}
        </AlertMessage>
      )}

      {successMessage && (
        <AlertMessage title="Atualização concluída" type="success">
          {successMessage}
        </AlertMessage>
      )}

      <div className="services-page">
        <section className="page-panel" aria-labelledby="service-form-title">
          <h2 id="service-form-title">
            {selectedService ? 'Editar serviço' : 'Novo serviço'}
          </h2>
          <p>
            Defina nome, preço e duração. Serviços inativos ficam armazenados,
            mas deixam de aparecer para novos agendamentos.
          </p>

          <ServiceForm
            key={selectedService?.id || `new-${formVersion}`}
            initialValues={formInitialValues}
            isSubmitting={isSubmitting}
            onCancel={selectedService ? handleCancelEdit : undefined}
            onSubmit={handleSubmitService}
            submitLabel={selectedService ? 'Salvar alterações' : 'Cadastrar'}
          />
        </section>

        <section className="page-panel" aria-labelledby="services-list-title">
          <div className="services-page__list-header">
            <div>
              <h2 id="services-list-title">Serviços cadastrados</h2>
              <p>
                {activeServicesCount} ativos de {services.length} cadastrados
              </p>
            </div>

            <Button onClick={loadServices} type="button" variant="secondary">
              Atualizar
            </Button>
          </div>

          {isLoading && <Loading label="Carregando serviços..." />}

          {!isLoading && services.length === 0 && (
            <EmptyState
              title="Nenhum serviço cadastrado"
              description="Cadastre o primeiro serviço para liberar opções no agendamento."
            />
          )}

          {!isLoading && services.length > 0 && (
            <div className="services-page__list">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  isToggling={actionId === service.id}
                  onEdit={setSelectedService}
                  onToggleStatus={toggleServiceStatus}
                  service={service}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </section>
  )
}

export default Services
