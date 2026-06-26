import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../Button/index.jsx'
import Input from '../Input/index.jsx'
import { validateProfessional } from '../../utils/validation.js'
import './ProfessionalForm.css'

const EMPTY_PROFESSIONAL = {
  name: '',
  workStart: '08:00',
  workEnd: '18:00',
}

function ProfessionalForm({
  initialValues = EMPTY_PROFESSIONAL,
  isSubmitting = false,
  onCancel,
  onSubmit,
  submitLabel = 'Salvar profissional',
}) {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({
    defaultValues: initialValues,
  })

  useEffect(() => {
    reset(initialValues)
  }, [initialValues, reset])

  function submitProfessional(values) {
    const normalizedProfessional = {
      name: values.name.trim(),
      workStart: values.workStart,
      workEnd: values.workEnd,
    }

    return onSubmit(normalizedProfessional)
  }

  return (
    <form className="professional-form" onSubmit={handleSubmit(submitProfessional)}>
      <Input
        error={errors.name?.message}
        label="Nome"
        placeholder="Nome do profissional"
        {...register('name', {
          validate: (value, formValues) =>
            validateProfessional({ ...formValues, name: value }).name || true,
        })}
      />

      <div className="professional-form__hours">
        <Input
          error={errors.workStart?.message}
          label="Início do expediente"
          type="time"
          {...register('workStart', {
            validate: (value, formValues) =>
              validateProfessional({ ...formValues, workStart: value })
                .workStart || true,
          })}
        />

        <Input
          error={errors.workEnd?.message}
          label="Final do expediente"
          type="time"
          {...register('workEnd', {
            validate: (value, formValues) =>
              validateProfessional({ ...formValues, workEnd: value }).workEnd ||
              true,
          })}
        />
      </div>

      <div className="professional-form__actions">
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Salvando...' : submitLabel}
        </Button>
        {onCancel && (
          <Button onClick={onCancel} type="button" variant="secondary">
            Cancelar edição
          </Button>
        )}
      </div>
    </form>
  )
}

export default ProfessionalForm