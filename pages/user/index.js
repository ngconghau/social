import React, { useState, useEffect } from 'react'
import styles from '../../styles/UserInfo.module.css'
import {database} from '../firebase'
import Nav from '../nav'

const UserInfo = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    dateofbirth: '',
  })


  useEffect(() => {
    database
      .collection('users')
      .doc(localStorage.getItem('data'))
      .get()
      .then((doc) => {
        setUser({
          name: doc.data().name,
          email: doc.data().email,
          dateofbirth: doc.data().dob,
        })
      })
  }, [])

  const handleUpdateUser = () => {
    database
      .collection('users')
      .doc(localStorage.getItem('data'))
      .update({
        name: user.name,
        email: user.email,
        dob: user.dateofbirth,
        updatedAt: new Date(),
      })
    alert('update success')
  }

  return (
    <>
      <Nav />
      <div className={styles.card}>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.form_group}>
              <label>Name</label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => {
                  setUser({ ...user, name: e.target.value })
                }}
              />
            </div>
          </div>
          <div className={styles.col}>
            <div className={styles.form_group}>
              <label>Email</label>
              <input
                type="text"
                value={user.email}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value })
                }}
              />
            </div>
          </div>
          <div className={styles.col}>
            <div className={styles.form_group}>
              <label>Date of birth</label>
              <input
                type="date"
                value={user.dateofbirth}
                onChange={(e) => {
                  setUser({ ...user, dateofbirth: e.target.value })
                }}
              />
            </div>
          </div>
          <div className={styles.col}>
            <input type="submit" value="Update" onClick={handleUpdateUser} />
          </div>
        </div>
      </div>
    </>
  )
}

export default UserInfo
