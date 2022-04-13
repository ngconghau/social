import React, { useState, useEffect } from 'react'
import { database, serverTimestamp } from '../../pages/firebase'

const Comments = ({postId}) => {
  const [postsComment, setPostComments] = useState([])

  useEffect(() => {
    database
      .collection(`comments/${postId}/postComments`)
      .get()
      .then((querysnapshot) => {
        let post = []
        querysnapshot.forEach((doc) => {
          let comment = {
            id: doc.id,
            content: doc.data().content,
            userRef: doc.data().userRef,
          }
          if (comment.userRef) {
            database
              .doc(doc.data().userRef)
              .get()
              .then((doc) => {
                comment.userRef = {
                  uid: doc.id,
                  name: doc.data().name,
                }
                post.push(comment)
              })
              .then(() => {
                setPostComments(post)
              })
          }
        })
      })
    return
  }, [postId])
  const handleClick = () => {
    database
      .collectionGroup('postComments')
      .get()
      .then((querysnapshot) => {
        let post = []
        querysnapshot.forEach((doc) => {
          let comment = {
            id: doc.id,
            content: doc.data().content,
            userRef: doc.data().userRef,
          }
          if (comment.userRef) {
            database
              .doc(doc.data().userRef)
              .get()
              .then((doc) => {
                comment.userRef = {
                  uid: doc.id,
                  name: doc.data().name,
                }
                post.push(comment)
              })
              .then(()=>{
                setPostComments(post)
              })
          }
        })
      
      })
  }
  // useEffect(() => {
  //   const ownersCollection = database.collection('users')
  //   const unicornsCollection = database.collectionGroup('postComments')

  //   const ownersData = {}

  //   let unis = []
  //   unicornsCollection.onSnapshot(async (querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       let uni = {
  //         id: doc.id,
  //         content: doc.data().content,
  //         //Assuming the userRef field is the UID of userRef
  //         userRef: doc.data().userRef,
  //       }

  //       if (uni.userRef) {
  //         //Check if userRef's data is already fetched to save extra requests to Firestore
  //         if (ownersData[uni.userRef]) {
  //           uni.userRef = {
  //             id: ownersData[uni.userRef].id,
  //             name: ownersData[uni.userRef].name,
  //           }
  //           unis.push(uni)
  //         } else {
  //           //User the ownersCollection Reference to get userRef information
  //           ownersCollection
  //             .doc(uni.userRef)
  //             .get()
  //             .then((ownerDoc) => {
  //               uni.userRef = {
  //                 id: ownerDoc.id,
  //                 name: ownerDoc.data().name,
  //               }
  //               ownersData[uni.userRef] = {
  //                 id: ownerDoc.id,
  //                 name: ownerDoc.data().name,
  //               }
  //               unis.push(uni)
  //             })
  //             .then(() => {
  //               setPostComments(unis)
  //             })
  //             .catch((err) => console.error(err))
  //         }
  //       } else {
  //         unis.push(uni)
  //       }
  //     })
  //   })
  // },[])
  return (
    <div>
      <ul>
        {postsComment.map((comment)=>
          (
            <li key={comment.id}>{comment.content}</li>
          )
        )}
      </ul>
    </div>
  )
}

export default Comments
