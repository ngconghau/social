import React, { useState, useEffect } from 'react'
import firebase from '../firebase'
import md5 from 'md5'

const useForm = () => {
  const database = firebase.firestore()
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    dateofbirth: '',
    hasAccount: false,
  })

  const [isLogin, setIsLogin] = useState()

  useEffect(() => {
    setIsLogin(JSON.parse(localStorage.getItem('isLogin')))
  }, [isLogin])

  const clearState = () => {
    setValues({
      username: '',
      email: '',
      password: '',
      hasAccount: !values.hasAccount,
      dateofbirth: '',
    })
  }

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

  const handleSignUp = async (e) => {
    e.preventDefault()
    const db = database.collection('users')
    const snapshot = await db.where('email', '==', values.email).get()
    if (snapshot.empty) {
      db.add({
        name: values.username,
        email: values.email,
        pass: md5(values.password),
        dob: values.dateofbirth,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      alert('Add success', () => {
        setValues({ ...values, hasAccount: !values.hasAccount })
      })
    } else {
      alert('Error!!! Email exsisted')
    }
  }
  const handleLogOut = () => {
    localStorage.setItem('isLogin', false)
    setIsLogin(false)
    localStorage.removeItem('data')
  }

  return {
    isLogin,
    values,
    handleOnChange,
    handleSignIn,
    handleSignUp,
    handleLogOut,
    clearState,
  }
}

export default useForm
