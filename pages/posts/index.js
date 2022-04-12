import React, { useState, useEffect } from 'react'
import { database, serverTimestamp } from '../firebase'
import styles from '../../styles/Post.module.css'
import Image from 'next/image'

const Post = () => {
  const [posts, setPosts] = useState([])
  const [userPosts, setUserPosts] = useState([])
  const [user, setUser] = useState()
  const [createPosts, setCreatePosts] = useState({
    title: '',
    content: '',
  })
  //get user name
  useEffect(() => {
    const getNameUser = database
      .collection('users')
      .doc(localStorage.getItem('data'))
      .onSnapshot((doc) => {
        setUser(doc.data().name)
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
           createdAt: post.data.createdAt.toDate().toDateString()
        })
      })

      setPosts(userPostList)
    })

    return getAllUsers
  }, [userPosts])

  const handleCreatePost = (e) => {
    e.preventDefault()
    database
      .collection('posts')
      .doc(localStorage.getItem('data'))
      .collection('userPosts')
      .add({
        title: createPosts.title,
        content: createPosts.content,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
  }
  return (
    <div className={styles.container}>
      <div className={styles.write_post_container}>
        <div className={styles.user_profile}>
          <span>
            <Image src="/profile-pic.png" alt="" layout="fill" />
          </span>
          <div>
            <p>{user}</p>
          </div>
        </div>
        <div className={styles.post_input_container}>
          <form onSubmit={handleCreatePost}>
            <textarea
              type="text"
              placeholder="Title"
              required
              value={createPosts.title}
              onChange={(e) =>
                setCreatePosts({ ...createPosts, title: e.target.value })
              }
            />
            <textarea
              rows="5"
              placeholder="Content"
              required
              value={createPosts.content}
              onChange={(e) =>
                setCreatePosts({ ...createPosts, content: e.target.value })
              }
            />
            <div className={styles.add_post_link}>
              <a href="#">
                <span>
                  <Image src="/live-video.png" alt="" layout="fill" />
                </span>
                Live Video
              </a>
              <a href="#">
                <span>
                  <Image src="/photo.png" alt="" layout="fill" />
                </span>
                Photo/Video
              </a>
              <a href="#">
                <span>
                  <Image src="/feeling.png" alt="" layout="fill" />
                </span>
                Feling/Activity
              </a>
              <button type="submit">Create</button>
            </div>
          </form>
        </div>
      </div>

      {posts.map((post) => (
        <div className={styles.post_container} key={post.id}>
          <div className={styles.user_profile}>
            <span>
              <Image src="/profile-pic.png" alt="profile" layout="fill" />
            </span>
            <div>
              <p>{post.authour}</p>
              <span>{post.createdAt}</span>
            </div>
          </div>
          <div className={styles.post_text}>
            <p>{post.title}</p>
            <p>{post.content}</p>
            <div className={styles.post_row}>
              <div className={styles.activity_icon}>
                <div>
                  <span>
                    <Image src="/like-blue.png" alt="" layout="fill" />
                  </span>
                  100
                </div>
                <div>
                  <span>
                    <Image src="/comments.png" alt="" layout="fill" />
                  </span>
                  45
                </div>
                <div>
                  <span>
                    <Image src="/share.png" alt="" layout="fill" />
                  </span>
                  33
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Post
