import React from 'react'
import Image from 'next/image'
import styles from '../../styles/Post.module.css'
import Comments from '../comments/Comments'

const Post = ({post}) => {
   // console.log(post);
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
        <div className={styles.post_row}>
          {/* <div className={styles.activity_icon}>
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
          </div> */}
        </div>
        <Comments postId={post.id} />
      </div>
    </div>
  )
}

export default Post