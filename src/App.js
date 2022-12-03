import { Button, Container } from '@chakra-ui/react'
import { useContext } from 'react'
import LoginForm from "./components/LoginForm"
import Dashboard from "./components/Dashboard"
import { AuthContext } from './context/AuthContext'

const App = () => {
  const { loggedIn, logout } = useContext(AuthContext)

  return (
    <Container p={10}>
      {loggedIn ? (
        <>
          <Button mb={10} onClick={logout}>Log out</Button>
          <Dashboard />
        </>
      ) : (
        <LoginForm />
      )}
    </Container>
  )
}

export default App
