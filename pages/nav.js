import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../styles/Nav.module.css'
import { database } from '../pages/firebase'
import Image from 'next/image'

const Nav = ({ handleLogOut }) => {
  const [user, setUser] = useState()
  useEffect(() => {
    database
      .collection('users')
      .doc(localStorage.getItem('data'))
      .onSnapshot((doc) => {
        setUser(doc.data().name)
      })
  }, [])

  return (
    <>
      <div className={styles.container}>
        <nav>
          <Link href="./">
            <a className={styles.avatar}>
              <h2>Social</h2>
            </a>
          </Link>
          <Link href="./user">
            <a className={styles.avatar}>{user}</a>
          </Link>
          <button onClick={handleLogOut}>Logout</button>
        </nav>
      </div>  
    </>
  )
}

export default Nav
