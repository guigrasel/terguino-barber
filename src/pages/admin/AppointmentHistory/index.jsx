import AlertMessage from '../../../components/AlertMessage/index.jsx'
import EmptyState from '../../../components/EmptyState/index.jsx'
import HistoryFilters from '../../../components/HistoryFilters/index.jsx'
import HistoryTable from '../../../components/HistoryTable/index.jsx'
import Loading from '../../../components/Loading/index.jsx'
import { useAppointmentHistory } from '../../../hooks/useAppointmentHistory.js'
import { formatDateToDisplay } from '../../../utils/date.js'

function AppointmentHistory() {
  const {
    endDate,
    errorMessage,
    historyAppointments,
    isLoading,
    professionals,
    selectedProfessionalId,
    selectedStatus,
    setEndDate,
    setSelectedProfessionalId,
    setSelectedStatus,
    setStartDate,
    startDate,
  } = useAppointmentHistory()

  return (
    <section className="page-shell">
      <header className="page-header">
        <span className="page-eyebrow">Histórico</span>
        <h1>Histórico de atendimentos</h1>
        <p>
          Consulte atendimentos passados e cancelamentos com os valores
          registrados no momento do agendamento.
        </p>
      </header>

      <section className="page-panel" aria-labelledby="history-filters-title">
        <h2 id="history-filters-title">Filtros</h2>
        <HistoryFilters
          endDate={endDate}
          onEndDateChange={setEndDate}
          onProfessionalChange={setSelectedProfessionalId}
          onStartDateChange={setStartDate}
          onStatusChange={setSelectedStatus}
          professionalId={selectedProfessionalId}
          professionals={professionals}
          startDate={startDate}
          status={selectedStatus}
        />
      </section>

      {errorMessage && (
        <AlertMessage title="Atenção" type="error">
          {errorMessage}
        </AlertMessage>
      )}

      {isLoading && <Loading label="Carregando histórico..." />}

      {!isLoading && !errorMessage && historyAppointments.length === 0 && (
        <EmptyState
          title="Nenhum registro encontrado"
          description={`Não há histórico entre ${formatDateToDisplay(startDate)} e ${formatDateToDisplay(endDate)} com os filtros atuais.`}
        />
      )}

      {!isLoading && !errorMessage && historyAppointments.length > 0 && (
        <section className="page-panel" aria-labelledby="history-table-title">
          <h2 id="history-table-title">Registros encontrados</h2>
          <HistoryTable appointments={historyAppointments} />
        </section>
      )}
    </section>
  )
}

export default AppointmentHistory
