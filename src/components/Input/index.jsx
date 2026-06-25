import './Input.css'

function Input({ error, helperText, id, label, ...props }) {
  const inputId = id || props.name

  return (
    <div className="input-field">
      {label && <label htmlFor={inputId}>{label}</label>}
      <input id={inputId} aria-invalid={Boolean(error)} {...props} />
      {(error || helperText) && (
        <small className={error ? 'input-field__error' : 'input-field__helper'}>
          {error || helperText}
        </small>
      )}
    </div>
  )
}

export default Input
