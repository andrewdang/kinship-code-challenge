import React, { useEffect, useState } from "react"

const AuthContext = React.createContext(null)

const AuthProvider = ({ children }) => {
  const petExecUserId = localStorage.getItem("petexec_user_id")
  const accessToken = localStorage.getItem("petexec_access_token")
  const [loggedIn, setLoggedIn] = useState(!!accessToken)
  const [loginError, setLoginError] = useState(null)
  const [userId, setUserId] = useState(petExecUserId)

  const login = (username, password) => {
    let formData = new FormData()
    formData.append("username", username)
    formData.append("password", password)
    formData.append("grant_type", "password")
    formData.append("scope", "owner_read usercard_read usercard_delete")

    fetch("https://secure.petexec.net/api/token", {
      method: "POST",
      headers: {
        // token would normally be stored in an environment variable instead of hardcoded
        "Authorization": `Basic Y2ViOTExOWFjMzRmNjE0NmIyZWVjNzVmY2FmZjUxZjc6ZGE4NjRkZDU1NzUwM2RkY2NhNzk3YTgwYzE0ZDQ4NmZmZmFmOGU4NzRkYTUzYTg2N2VmMzlhOTZiNTBiMWU2MQ==`
      },
      body: formData
    })
    .then(res => res.json())
    .then(res => {
      if (res.access_token) {
        localStorage.setItem("petexec_access_token", res.access_token)
        setLoggedIn(true)
        setLoginError(null)
      } else if (res.error_description) {
        setLoginError(res.error_description)
      } else {
        throw("unknown auth error")
      }
    })
    .catch(_e =>{
      setLoginError("Unable to login. Please try again.")
      logout()
    })
  }

  const logout = () => {
    localStorage.removeItem("petexec_access_token")
    localStorage.removeItem("petexec_user_id")
    setLoggedIn(false)
  }

  useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem("petexec_access_token")

      fetch("https://secure.petexec.net/api/profile", {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(({ userid }) => {
          localStorage.setItem("petexec_user_id", userid)
          setUserId(userid)
        })
    }
  }, [loggedIn])

  return (
    <AuthContext.Provider value={{ userId, loggedIn, login, loginError, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
