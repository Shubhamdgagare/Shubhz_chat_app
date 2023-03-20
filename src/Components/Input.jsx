import React, { useContext, useState } from 'react'
import Img from "../img/img.png"
import Attach from "../img/attach.png"
import { AuthContext } from './context/AuthContext';
import { ChatContext } from './context/ChatContext';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';


const Input = () => {
  // sending message into database to save in combined id chats collection
  const[text, setText] = useState("");

  // sending files into database
  const[img, setImg] = useState(null);

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  // sending data to collection 
  const handleSend = async () =>{

    if(img){

      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable (storageRef, img);  

      uploadTask.on(
        (error) => {
          // setErr(true)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId),{
              messages:arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img:downloadURL,
              })
            });
            
          });  
        }
      );

    } else{
      // if there is no image in input then store text 

      // here we are using uuid package to identify object
      // uuid = A UUID (Universal Unique Identifier) is a 128-bit number used to uniquely identify some object or entity on the Internet.
      // Here we are sending timestamp with text. x`
      await updateDoc(doc(db, "chats", data.chatId),{
        messages:arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        })
      });
    };

    // it will show updated message below friends username and put his message on top
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);

  };

  return (
    <div className='input'>
      <input type="text" placeholder='Type Something....' onChange={(e)=> setText(e.target.value)} value={text}/>
      <div className='send'>
        <img src={Attach} alt="" />
        <input type="file" style={{display:"none"}} id="file" onChange={(e)=>setImg(e.target.files[0])}/>
        <label htmlFor='file'>
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input