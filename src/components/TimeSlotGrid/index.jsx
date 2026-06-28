import './TimeSlotGrid.css'

function TimeSlotGrid({ onSelect, selectedStartTime, slots = [] }) {
  return (
    <div className="time-slot-grid" role="list">
      {slots.map((slot) => (
        <button
          className={`time-slot-grid__item ${
            selectedStartTime === slot.startTime
              ? 'time-slot-grid__item--selected'
              : ''
          }`}
          key={`${slot.startTime}-${slot.endTime}`}
          onClick={() => onSelect(slot)}
          type="button"
        >
          <span>{slot.startTime}</span>
          <small>ate {slot.endTime}</small>
        </button>
      ))}
    </div>
  )
}

export default TimeSlotGrid