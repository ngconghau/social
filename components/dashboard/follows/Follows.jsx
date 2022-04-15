import React, { useState, useEffect } from 'react'
import styles from '../../../styles/Follow.module.css'
import { database, serverTimestamp } from '../../../pages/firebase'

const Follows = () => {
  const [text, setText] = useState('')

  const handleSearch = async (e) => {
    e.preventDefault()
    database
      .collection('users')
      .get()
      .then((snapshot) => {
        let arrUser = []
        snapshot.forEach((doc) => {
          arrUser.push({ id: doc.id, data: doc.data() })
        })
        console.log(arrUser)
      })
    setText('')
  }

  return (
    <div className={styles.follow_container}>
      <div className={styles.search_container}>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Seach..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  )
}

export default Follows
