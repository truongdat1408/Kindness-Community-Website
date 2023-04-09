import React from 'react'
import { useState } from 'react';

export default function AnswerForm({ avatarUrl, handleSubmit, id}) {
    const [content, setContent] = useState("")
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && content !== "") {
          handleSubmit(content, id)
          setContent("")
          event.preventDefault();
        }
    }
    return (
        <>
            <li className="post-comment">
                <div className="comet-avatar">
                    <img onError={(e) => { e.target.src = "../assets/img/theme/Default-avatar.jpg" }} src={avatarUrl} alt="" style={{ width: 38, height: 38 }} />
                </div>
                <div className="post-comt-box">
                    <form>
                        <textarea placeholder="Answer this question..." value={content} name='content' onKeyDown={handleKeyDown} onChange={(e) => {setContent(e.target.value)}}/>
                        <button type='button' />
                    </form>
                </div>
            </li>
        </>
    )
}