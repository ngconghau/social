import { useState, createContext } from 'react'
import firebase, { database, auth, serverTimestamp } from '../pages/firebase'
import md5 from 'md5'
const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('xin chào')
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    dateofbirth: '',
    hasAccount: false,
  })

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    const db = database.collection('users')
    const snapshot = await db
      .where('email', '==', values.email)
      .where('pass', '==', md5(values.password))
      .get()
    if (snapshot.empty) {
      alert('Error!!! Email or password not correct')
      return
    }
    snapshot.forEach((doc) => {
      localStorage.setItem('data', doc.id)
      localStorage.setItem('isLogin', true)
      setIsLogin(true)
    })
  }

  const clearState = () => {
    setValues({
      username: '',
      email: '',
      password: '',
      hasAccount: !values.hasAccount,
      dateofbirth: '',
    })
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    auth
      .createUserWithEmailAndPassword(values.email, md5(values.password))
      .then((resultUser) => {
        database.collection('users').doc(resultUser.user.uid).set({
          name: values.username,
          email: values.email,
          dob: values.dateofbirth,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })
        setValues({ ...values, hasAccount: !values.hasAccount })
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.')
        } else {
          alert(errorMessage)
        }
        console.log(error)
      })
  }

  const handleLogOut = () => {
    localStorage.setItem('isLogin', false)
    setIsLogin(false)
    localStorage.removeItem('data')
  }

  const authValues = {
    user,
    values,
    handleSignIn,
    handleOnChange,
    clearState,
    handleSignUp,
    handleLogOut,
  }

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
