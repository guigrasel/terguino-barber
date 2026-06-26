import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { validateService } from '../../utils/validation.js'
import Button from '../Button/index.jsx'
import Input from '../Input/index.jsx'
import './ServiceForm.css'

const EMPTY_SERVICE = {
  durationMinutes: 30,
  name: '',
  price: 0,
}

function ServiceForm({
  initialValues = EMPTY_SERVICE,
  isSubmitting = false,
  onCancel,
  onSubmit,
  submitLabel = 'Salvar serviço',
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

  function submitService(values) {
    const normalizedService = {
      durationMinutes: Number(values.durationMinutes),
      name: values.name.trim(),
      price: Number(values.price),
    }

    return onSubmit(normalizedService)
  }

  return (
    <form className="service-form" onSubmit={handleSubmit(submitService)}>
      <Input
        error={errors.name?.message}
        label="Nome"
        placeholder="Nome do serviço"
        {...register('name', {
          validate: (value, formValues) =>
            validateService({ ...formValues, name: value }).name || true,
        })}
      />

      <div className="service-form__values">
        <Input
          error={errors.price?.message}
          label="Preço"
          min="0"
          placeholder="45"
          step="0.01"
          type="number"
          {...register('price', {
            valueAsNumber: true,
            validate: (value, formValues) =>
              validateService({ ...formValues, price: value }).price || true,
          })}
        />

        <Input
          error={errors.durationMinutes?.message}
          label="Duração em minutos"
          min="1"
          placeholder="30"
          step="5"
          type="number"
          {...register('durationMinutes', {
            valueAsNumber: true,
            validate: (value, formValues) =>
              validateService({ ...formValues, durationMinutes: value })
                .durationMinutes || true,
          })}
        />
      </div>

      <div className="service-form__actions">
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

export default ServiceForm
