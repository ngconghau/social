import React, { useState, useEffect } from 'react'
import firebase from '../../pages/firebase'
import md5 from 'md5'
const useForm = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    dateofbirth: '',
    hasAccount: false,
    createAt: '',
    updateAt: '',
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
      createAt: '',
      updateAt: '',
    })
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const handleSignIn = (e) => {
    e.preventDefault()
    firebase
      .firestore()
      .collection('users')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (
            values.email === doc.data().email &&
            md5(values.password) === doc.data().pass
          ) {
            localStorage.setItem('data', doc.id)
            localStorage.setItem('isLogin', true)
            setIsLogin(true)
          } else {
            console.log('not exsist')
          }
        })
      })
  }

  const handleSignUp = (e) => {
    e.preventDefault()
    firebase
      .firestore()
      .collection('users')
      .add({
        name: values.username,
        email: values.email,
        pass: md5(values.password),
        dob: values.dateofbirth,
        createAt: new Date(),
        updateAt: new Date(),
      })
      .then(() => {
        alert('add success')
      })
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
