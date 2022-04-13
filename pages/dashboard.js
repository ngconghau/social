import React, { useState, useEffect } from 'react'
import Nav from './nav'

import PostPage from './posts'
const Dashboard = ({handleLogOut}) => {
  return (
    <div>
      <Nav handleLogOut={handleLogOut} />
      <PostPage />
    </div>
  )
}

export default Dashboard
