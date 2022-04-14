import React, { useState, useEffect } from 'react'
import { database, serverTimestamp } from '../../../pages/firebase'
import styles from '../../../styles/Post.module.css'
import Post from './Post'
import PostForm from './PostFrom'

const PostPage = () => {
  const [posts, setPosts] = useState([])
  const [userPosts, setUserPosts] = useState([])
  const [user, setUser] = useState({
    id: localStorage.getItem('data'),
    name: '',
  })
  //get user name
  useEffect(() => {
    const getNameUser = database
      .collection('users')
      .doc(localStorage.getItem('data'))
      .onSnapshot((doc) => {
        setUser((user) => ({ ...user, name: doc.data().name }))
      })
    return getNameUser
  }, [])

  // run after component render
  useEffect(() => {
    const getAllUserPosts = database
      .collectionGroup('userPosts')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        let userPosts = []
        querySnapshot.forEach((doc) => {
          userPosts.push({
            uid: doc.ref.parent.parent.id,
            upid: doc.id,
            data: {
              title: doc.data().title,
              content: doc.data().content,
              createdAt: doc.data().createdAt,
            },
          })
        })
        if (!querySnapshot.metadata.hasPendingWrites) {
          setUserPosts(userPosts)
        }
      })
    return () => getAllUserPosts
  }, [])

  // run when userPosts change
  useEffect(() => {
    if (!userPosts.length) {
      return
    }

    const getAllUsers = database
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
          createdAt: post.data.createdAt
            .toDate()
            .toDateString()
            .concat(', ', post.data.createdAt.toDate().toLocaleTimeString()),
        })
      })
      setPosts(userPostList)
    })

    return getAllUsers
  }, [userPosts])
  
  const handleCreatePost = (text) => {
    database
      .collection('posts')
      .doc(localStorage.getItem('data'))
      .collection('userPosts')
      .add({
        title: text.title,
        content: text.content,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
  }
  return (
    <div className={styles.container}>
      <PostForm user={user} handleCreatePost={handleCreatePost} />
      {posts.map((post) => (
        <Post key={post.id} post={post} userCurrentId={user} />
      ))}
    </div>
  )
}

export default PostPage
