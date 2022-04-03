import React, { useState, useEffect } from 'react'
import firebase from '../../pages/firebase'

const Post = () => {
  const [posts, setPosts] = useState([])
  const [userPost , setUserPost] = useState({
    title : '',
    content : '',
    createdAt : '',
    updatedAt: ''
  })

  useEffect(() => {
    const db = firebase.firestore()
    const getAllUserPosts = db
      .collectionGroup('userPosts')
      .orderBy('createdAt', 'desc')
      .get()
      .then((querySnapshot) => {
        let userPosts = []
        querySnapshot.forEach((doc) => {
          userPosts.push({
            uid: doc.ref.parent.parent.id,
            upid: doc.id,
            data: { title: doc.data().title, content: doc.data().content },
          })
        })
        return Promise.resolve(userPosts)
      })

    const getAllUsers = db
      .collection('users')
      .get()
      .then((querySnapshot) => {
        let users = []
        querySnapshot.forEach((doc) => {
          users.push({
            id: doc.id,
            name: doc.data().name,
          })
        })
        return Promise.resolve(users)
      })

    getAllUserPosts.then((userPosts) => {
      let uids = userPosts.map((usePost) => {
        return usePost.uid
      })
      const getUserByUserPostId = getAllUsers.then((users) => {
        let resultUser = users.filter((user) => {
          return uids.includes(user.id)
        })
        return Promise.resolve([resultUser, userPosts])
      })
      
      getUserByUserPostId.then(([resultUser, userPosts]) => {
        let userPostList = []
        userPosts.map((post) => {
          const user = resultUser.find((u) => {
            return u.id === post.uid
          })
          userPostList.push({
            id: post.upid,
            authour: user.name,
            title: post.data.title,
            content: post.data.content,
          })
        })
        setPosts(userPostList)
      })
    })
  }, [])
  return (
    <div className="container">
      <form >
        <label>Title</label>
        <input type="tex" required  />
      </form>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <div>
              <h1>Title :{post.title}</h1>
              <h5>Authour: {post.authour} </h5>
              <p>{post.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Post
