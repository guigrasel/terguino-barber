import AlertMessage from '../../../components/AlertMessage/index.jsx'
import EmptyState from '../../../components/EmptyState/index.jsx'
import Loading from '../../../components/Loading/index.jsx'
import ScheduleFilters from '../../../components/ScheduleFilters/index.jsx'
import ScheduleTable from '../../../components/ScheduleTable/index.jsx'
import { useSchedule } from '../../../hooks/useSchedule.js'
import { formatDateToDisplay } from '../../../utils/date.js'

function Schedule() {
  const {
    appointments,
    errorMessage,
    isLoading,
    professionals,
    selectedDate,
    selectedProfessionalId,
    setSelectedDate,
    setSelectedProfessionalId,
  } = useSchedule()

  return (
    <section className="page-shell">
      <header className="page-header">
        <span className="page-eyebrow">Agenda</span>
        <h1>Agenda administrativa</h1>
        <p>
          Acompanhe os agendamentos da barbearia por data e profissional.
        </p>
      </header>

      <section className="page-panel" aria-labelledby="schedule-filters-title">
        <h2 id="schedule-filters-title">Filtros</h2>
        <ScheduleFilters
          date={selectedDate}
          onDateChange={setSelectedDate}
          onProfessionalChange={setSelectedProfessionalId}
          professionalId={selectedProfessionalId}
          professionals={professionals}
        />
      </section>

      {errorMessage && (
        <AlertMessage title="Atenção" type="error">
          {errorMessage}
        </AlertMessage>
      )}

      {isLoading && <Loading label="Carregando agenda..." />}

      {!isLoading && !errorMessage && appointments.length === 0 && (
        <EmptyState
          title="Nenhum agendamento encontrado"
          description={`Não há registros para ${formatDateToDisplay(selectedDate)} com os filtros atuais.`}
        />
      )}

      {!isLoading && !errorMessage && appointments.length > 0 && (
        <section className="page-panel" aria-labelledby="schedule-table-title">
          <h2 id="schedule-table-title">
            Agendamentos de {formatDateToDisplay(selectedDate)}
          </h2>
          <ScheduleTable appointments={appointments} />
        </section>
      )}
    </section>
  )
}

export default Schedule
