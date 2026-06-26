import { useForm } from 'react-hook-form'
import { hasMinimumLength, isBlank } from '../../utils/validation.js'
import { isValidPhone, normalizePhone } from '../../utils/phone.js'
import Button from '../Button/index.jsx'
import Input from '../Input/index.jsx'
import './ClientIdentificationForm.css'

function ClientIdentificationForm({ isSubmitting = false, onSubmit }) {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
    },
  })

  function submitClient(values) {
    return onSubmit({
      name: values.name.trim(),
      phone: normalizePhone(values.phone),
    })
  }

  return (
    <form
      className="client-identification-form"
      onSubmit={handleSubmit(submitClient)}
    >
      <Input
        error={errors.name?.message}
        label="Nome"
        placeholder="Seu nome completo"
        {...register('name', {
          validate: {
            required: (value) =>
              !isBlank(value) || 'Informe seu nome para continuar.',
            minimumLength: (value) =>
              hasMinimumLength(value, 3) ||
              'O nome deve possuir no mínimo 3 caracteres.',
          },
        })}
      />

      <Input
        error={errors.phone?.message}
        helperText="Use DDD. O telefone será salvo somente com números."
        label="Telefone"
        placeholder="(00) 00000-0000"
        type="tel"
        {...register('phone', {
          validate: {
            required: (value) =>
              !isBlank(value) || 'Informe seu telefone para continuar.',
            validPhone: (value) =>
              isValidPhone(value) || 'Informe um telefone válido com DDD.',
          },
        })}
      />

      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Continuando...' : 'Continuar para agendamento'}
      </Button>
    </form>
  )
}

export default ClientIdentificationForm
