import React, { useState, useEffect } from 'react'
import firebase from '../firebase'

const Post = () => {
  const [posts, setPosts] = useState([])
  const [userPosts, setUserPosts] = useState([])
  const [createPosts, setCreatePosts] = useState({
    title: '',
    content: '',
  })

  // run after component render
  useEffect(() => {
    const db = firebase.firestore()
    const getAllUserPosts = db
      .collectionGroup('userPosts')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        let userPosts = []
        snapshot.forEach((doc) => {
          userPosts.push({
            uid: doc.ref.parent.parent.id,
            upid: doc.id,
            data: { title: doc.data().title, content: doc.data().content },
          })
        })
        setUserPosts(userPosts)
      })
    return () => getAllUserPosts
  }, [])

  // run when userPosts change
  useEffect(() => {
    if (!userPosts.length) {
      return
    }
    const db = firebase.firestore()
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

    getAllUsers.then((users) => {
      let uids = userPosts.map((usePost) => {
        return usePost.uid
      })
      let resultUser = users.filter((user) => {
        return uids.includes(user.id)
      })
      let userPostList = []
      userPosts.map((post) => {
        const users = resultUser.find((u) => {
          return u.id === post.uid
        })
        userPostList.push({
          id: post.upid,
          authour: users.name,
          title: post.data.title,
          content: post.data.content,
        })
      })
      setPosts(userPostList)
    })

    return getAllUsers
  }, [userPosts])

  const handleCreatePost = (e) => {
    e.preventDefault()
    const db = firebase.firestore()
    db.collection('posts')
      .doc(localStorage.getItem('data'))
      .collection('userPosts')
      .add({
        title: createPosts.title,
        content: createPosts.content,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
  }
  return (
    <>
      <form onSubmit={handleCreatePost}>
        <label>Title</label>
        <input
          type="text"
          required
          value={createPosts.title}
          onChange={(e) =>
            setCreatePosts({ ...createPosts, title: e.target.value })
          }
        />
        <label>Content</label>
        <textarea
          type="text"
          required
          value={createPosts.content}
          onChange={(e) =>
            setCreatePosts({ ...createPosts, content: e.target.value })
          }
        />
        <button type="submit">create</button>
      </form>
      <div className="container">
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
    </>
  )
}

export default Post
