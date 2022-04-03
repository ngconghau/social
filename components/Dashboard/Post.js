import React, { useState, useEffect } from 'react'
import firebase from '../../pages/firebase'

const Post = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const db = firebase.firestore()
    const getAllUserPosts = db
      .collectionGroup('userPosts')
      .orderBy('createAt', 'desc')
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
       userPosts.map((post)=>{
         const user = resultUser.find((u)=>{
           return u.id === post.uid
         })
         userPostList.push({
           id: post.upid,
           authour: user.name,
           title: post.data.title,
           content: post.data.content
         })
       }) 
        setPosts(userPostList)
      })
    })
  }, [])

  // const test = () => {
  //   const getAllUserPosts = db
  //     .collectionGroup('userPosts')
  //     .orderBy('createAt', 'desc')
  //     .get()
  //     .then((querySnapshot) => {
  //       let userPosts = []
  //       querySnapshot.forEach((doc) => {
  //         userPosts.push({
  //           uid: doc.ref.parent.parent.id,
  //           pid: doc.id,
  //           data: { title: doc.data().title, content: doc.data().content },
  //         })
  //       })
  //       return Promise.resolve(userPosts)
  //     })

  //   const getAllUsers = db
  //     .collection('users')
  //     .get()
  //     .then((querySnapshot) => {
  //       let users = []
  //       querySnapshot.forEach((doc) => {
  //         users.push({
  //           id: doc.id,
  //           name: doc.data().name,
  //         })
  //       })
  //       return Promise.resolve(users)
  //     })

  //   getAllUserPosts.then((userPosts) => {
  //     let uids = userPosts.map((usePost) => {
  //       return usePost.uid
  //     })

  //     const getUserByUserPostId = getAllUsers.then((users) => {
  //       let result = users.filter((user) => {
  //         return uids.includes(user.id)
  //       })
  //       return Promise.resolve({ user: result, posts: userPosts })
  //     })
  //     getUserByUserPostId.then((upid) => {
  //       setPosts(upid)
  //     })
  //   })
  // }
  return (
    <div>
      <div className="container">
        <h1></h1>
        <ul>
          { posts.length>0 && posts.map((post) => {
            <li key={post.id}>
            <h1>Authour: {post.authour} </h1>
            <h2>Title :{post.title}</h2>
            <p>{post.content}</p>
            </li>
            })}
        </ul>
      </div>
    </div>
  )
}

export default Post
