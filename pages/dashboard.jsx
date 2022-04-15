import React, { useState, useEffect } from 'react'
import Nav from './nav'
import styles from '../styles/Post.module.css'
import PostPage from '../components/dashboard/posts/Posts'
import Follows from '../components/dashboard/follows/Follows'
const Dashboard = ({ handleLogOut }) => {
  return (
    <div>
      <Nav handleLogOut={handleLogOut} />
      <div className={styles.container}>
        <Follows />
        <PostPage />
      </div>
    </div>
  )
}

export default Dashboard
