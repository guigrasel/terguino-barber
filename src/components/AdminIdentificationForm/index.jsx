import { useForm } from 'react-hook-form'
import { isBlank } from '../../utils/validation.js'
import Button from '../Button/index.jsx'
import Input from '../Input/index.jsx'
import './AdminIdentificationForm.css'

function AdminIdentificationForm({ isSubmitting = false, onSubmit }) {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      password: '',
      username: '',
    },
  })

  function submitAdmin(values) {
    return onSubmit({
      password: values.password,
      username: values.username.trim(),
    })
  }

  return (
    <form
      className="admin-identification-form"
      onSubmit={handleSubmit(submitAdmin)}
    >
      <Input
        autoComplete="username"
        error={errors.username?.message}
        label="Usuário"
        placeholder="admin"
        {...register('username', {
          validate: {
            required: (value) =>
              !isBlank(value) || 'Informe o usuário administrativo.',
          },
        })}
      />

      <Input
        autoComplete="current-password"
        error={errors.password?.message}
        label="Senha"
        placeholder="admin"
        type="password"
        {...register('password', {
          validate: {
            required: (value) =>
              !isBlank(value) || 'Informe a senha administrativa.',
          },
        })}
      />

      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Entrando...' : 'Entrar na gestão'}
      </Button>
    </form>
  )
}

export default AdminIdentificationForm
