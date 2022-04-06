import React, { useState, useEffect } from 'react'
import Nav from './nav'

import Post from './posts'
const Dashboard = ({handleLogOut}) => {
  return (
    <div>
      <Nav handleLogOut={handleLogOut} />
      <Post />
    </div>
  )
}

export default Dashboard
