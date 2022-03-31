import React, { useState, useEffect } from 'react'
import firebase from '../../pages/firebase'

import styles from '../../styles/Dashboard.module.css'
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
        <div>
          <span>{user}</span>
          <button onClick={handleLogOut}>Logout</button>
        </div>
      </nav>
    </div>
  )
}

export default Dashboard
