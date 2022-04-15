import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../styles/Nav.module.css'
import { database } from '../pages/firebase'
import Image from 'next/image'

const Nav = ({ handleLogOut }) => {
  const [user, setUser] = useState()
  useEffect(() => {
    const unsubcribe =database
      .collection('users')
      .doc(localStorage.getItem('data'))
      .onSnapshot((doc) => {
        setUser(doc.data().name)
      })
      return unsubcribe
  }, [])

  return (
    <>
      <div className={styles.container}>
        <nav>
          <div className={styles.nav_left}>
            <Link href="./">
              <a className={styles.logo}>
                <Image src="/logo.png" alt="logo" layout="fill" />
              </a>
            </Link>
          </div>
          <div className={styles.nav_right}>
            <div className={styles.search_box}>
              <input type="text" placeholder="Search" />
              <span>
                <Image src="/search.png" alt="search" layout="fill" />
              </span>
            </div>
            <div className={styles.nav_user_icon}>
              <Link href="./user">
                <a>
                  <Image src="/profile-pic.png" alt="search" layout="fill" />
                </a>
              </Link>
            </div>
            <a onClick={handleLogOut}>Logout</a>
          </div>
          
        </nav>
      </div>
    </>
  )
}

export default Nav
