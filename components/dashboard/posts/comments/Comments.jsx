import React, { useState, useEffect } from 'react'
import { database, serverTimestamp } from '../../../../pages/firebase'

import CommentForm from './CommentForm'

const Comments = ({ postId, userCommentId }) => {
  const [postsComment, setPostComments] = useState([])

  useEffect(() => {
    const getComments = database
      .collection(`comments/${postId}/postComments`).orderBy('createdAt', 'desc')
      .onSnapshot(async (querySnapshot) => {
        let comments = []
        querySnapshot.forEach((doc) => {
          comments.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        const arrComment = await Promise.all(
          comments.map(async (comment) => {
            const uCmt = {
              id: comment.id,
              content: comment.data.content,
              authour: (
                await database.doc(comment.data.userRef.path).get()
              ).data().name,
            }
            return uCmt
          })
        )
        setPostComments(arrComment)
        return arrComment
      })
    return getComments
  }, [postId])
  

  const handleCreateComment = (text) => {
    database
      .collection('comments')
      .doc(postId)
      .collection('postComments')
      .add({
        content: text,
        createdAt: serverTimestamp(),
        userRef: database.doc(`/users/${userCommentId.id}`),
      })
  }

  return (
    <div>
      <div>
        <CommentForm handleCreateComment={handleCreateComment} />
      </div>
      
      <ul>
        {postsComment.map((comment) => (
          <li key={comment.id}>
            <div>
              <h4>{comment.authour}</h4>
              <p>{comment.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
