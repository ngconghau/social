import React, { useState, useEffect } from 'react'
import firebase from '../../pages/firebase'

import styles from '../../styles/Dashboard.module.css'
import Post from './Post'
const Dashboard = ({ handleLogOut }) => {
  const [user, setUser] = useState()

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(localStorage.getItem('data'))
      .get()
      .then((doc) => {
        setUser(doc.data().name)
      })
  }, [])

  return (
    <div className={styles.container}>
      <nav>
        <h2>Social</h2>
        <span>{user}</span>
        <button onClick={handleLogOut}>Logout</button>
      </nav>
      <Post />
    </div>
  )
}

export default Dashboard
