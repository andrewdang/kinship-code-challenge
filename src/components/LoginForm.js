import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../context/AuthContext'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react'

const LoginForm = () => {
  const { login, loginError } = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const formErrors = errors.username || errors.password || loginError

  const onSubmit = ({ username, password }) => {
    login(username, password)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!formErrors}>
        <FormLabel>Username</FormLabel>
        <Input {...register("username", { required: true })} />

        <FormLabel>Password</FormLabel>
        <Input type="password" {...register("password", { required: true })} />

        <FormErrorMessage>
          {formErrors}
        </FormErrorMessage>
      </FormControl>

      <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
        Submit
      </Button>
    </form>
  )
}

export default LoginForm
