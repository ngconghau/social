import React, {useState } from 'react'
import styles from '../../../styles/Post.module.css'
import Image from 'next/image'


const PostForm = ({user , handleCreatePost}) => {
  const [values, setValues] = useState({
    title: '',
    content: '',
  })

  const onSubmit = (e)=>{
    e.preventDefault()
    handleCreatePost(values)
  }

  return (
    <div className={styles.write_post_container}>
      <div className={styles.user_profile}>
        <span>
          <Image src="/profile-pic.png" alt="" layout="fill" />
        </span>
        <div>
          <p>{user.name}</p>
        </div>
      </div>
      <div className={styles.post_input_container}>
        <form onSubmit={onSubmit}>
          <textarea
            type="text"
            placeholder="Title"
            required
            value={values.title}
            onChange={(e) =>
              setValues({ ...values, title: e.target.value })
            }
          />
          <textarea
            rows="5"
            placeholder="Content"
            required
            value={values.content}
            onChange={(e) =>
              setValues({ ...values, content: e.target.value })
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
  )
}

export default PostForm