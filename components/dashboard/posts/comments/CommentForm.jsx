import React, { useState, useEffect } from 'react'

const CommentForm = ({handleCreateComment}) => {
  const [text, setText] = useState('')

  const handleSubmit = (e)=>{
    e.preventDefault()
    handleCreateComment(text)
    setText('')
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          placeholder="Comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button type='submit' disabled={text.length===0}>Create</button>
      </form>
    </div>
  )
}

export default CommentForm
