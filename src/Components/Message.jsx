import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from './context/AuthContext'
import { ChatContext } from './context/ChatContext';

const Message = ({message}) => {

    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);

    // using useRef to go to latest message when we receive new message while chatting
    const ref = useRef()

    useEffect(() => {
      ref.current?.scrollIntoView({behavior:"smooth"})
    
    }, [message])
    

  return (

    // Here checking if sender is user or not, according to that css will decide side to put chat message
    // using ref here to locate to bottom of chat
    <div ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className="messageInfo">
        <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
        <span>Just Now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {/* if theme img in message then show img tag */}
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  )
}

export default Message;