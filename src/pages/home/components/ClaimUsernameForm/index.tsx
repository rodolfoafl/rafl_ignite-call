import { ArrowRight } from 'phosphor-react'
import { Button, Text, TextInput } from '@ignite-ui/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ErrorText, Form, FormAnnotation } from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O nome de usuário deve ter no mínimo 3 caracteres' })
    .max(30, { message: 'O nome de usuário deve ter no máximo 30 caracteres' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O nome de usuário deve conter apenas letras e hífens',
    })
    .transform((username) => username.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export default function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  const router = useRouter()

  const handleClaimUsername = async (data: ClaimUsernameFormData) => {
    const { username } = data

    await router.push(`/register/?username=${username}`)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size={'sm'}
          prefix="ignite.com/"
          placeholder="seu-usuario"
          crossOrigin={'anonymous'}
          {...register('username')}
        />
        <Button size={'sm'} type="submit" disabled={isSubmitting}>
          Reservar
          <ArrowRight />
        </Button>
      </Form>

      <FormAnnotation>
        {errors.username ? (
          <ErrorText size={'sm'}>{errors.username.message}</ErrorText>
        ) : (
          <Text size={'sm'}>Digite o nome de usuário desejado</Text>
        )}
      </FormAnnotation>
    </>
  )
}
