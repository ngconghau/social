import React from 'react'
import Image from 'next/image'
import styles from '../../../styles/Post.module.css'
import Comments from './comments/Comments'

const Post = ({ post, userCurrentId }) => {
  return (
    <div className={styles.post_container}>
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
      </div>
      <div className={styles.post_row}>
        <Comments postId={post.id} userCommentId={userCurrentId} />
      </div>
    </div>
  )
}

export default Post
