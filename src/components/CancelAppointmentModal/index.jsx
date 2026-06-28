import Button from '../Button/index.jsx'
import Modal from '../Modal/index.jsx'
import { formatDateToDisplay } from '../../utils/date.js'
import './CancelAppointmentModal.css'

function CancelAppointmentModal({
  appointment,
  isCanceling = false,
  isOpen,
  onClose,
  onConfirm,
}) {
  const professionalName =
    appointment?.professional?.name || 'Profissional não encontrado'
  const serviceName = appointment?.service?.name || 'Serviço não encontrado'

  return (
    <Modal
      footer={
        <>
          <Button disabled={isCanceling} onClick={onClose} variant="secondary">
            Manter agendamento
          </Button>
          <Button disabled={isCanceling} onClick={onConfirm}>
            {isCanceling ? 'Cancelando...' : 'Confirmar cancelamento'}
          </Button>
        </>
      }
      isOpen={isOpen}
      onClose={onClose}
      title="Cancelar agendamento"
    >
      <div className="cancel-appointment-modal">
        <p>
          Confirme o cancelamento deste compromisso. O registro será mantido no
          histórico.
        </p>

        {appointment && (
          <dl className="cancel-appointment-modal__summary">
            <div>
              <dt>Serviço</dt>
              <dd>{serviceName}</dd>
            </div>
            <div>
              <dt>Profissional</dt>
              <dd>{professionalName}</dd>
            </div>
            <div>
              <dt>Data</dt>
              <dd>{formatDateToDisplay(appointment.date)}</dd>
            </div>
            <div>
              <dt>Horário</dt>
              <dd>
                {appointment.startTime} às {appointment.endTime}
              </dd>
            </div>
          </dl>
        )}
      </div>
    </Modal>
  )
}

export default CancelAppointmentModal
