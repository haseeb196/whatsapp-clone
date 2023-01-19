import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@mui/icons-material'
import { Avatar, CircularProgress, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react';
import './Chat.css'
import { useParams } from "react-router-dom";
import db from './firebase';
import { useStateValue } from './StateProvider';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';


function Chat() {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();
  const [input, setInput] = useState("")
  const [roomName, setRoomName] = useState("");
const [{user}] = useStateValue();


  useEffect(() => {
  
 if(roomId) {
  db.collection("rooms")
  .doc(roomId)
  .onSnapshot((snapshot) => {
    const data = snapshot.data();
    setRoomName(data.name);
  });

  db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (
    setMessages(snapshot.docs.map((doc) => doc.data()))
  ));

}

 }, [roomId]);


  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, []);

const sendMessage =  (e) => {
  e.preventDefault();
  if(input === ''){
    alert('\n Enter Something')
  } else {
db.collection('rooms').doc(roomId).collection('messages').add({
  message : input,
  name : user.displayName,
  timestamp : firebase.firestore.FieldValue.serverTimestamp()
})
}
setInput('')  
  }


  return (
    <div className='chat'>
     <div className="chat__header">
      <Avatar src= {`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="chat__headerInfo">
        <h3>{roomName}</h3>
       <p>last seen {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p> 
       
     
       
      </div>
      <div className="chat__headerRight">
        <IconButton>
          <SearchOutlined />
        </IconButton>
        <IconButton>
          <AttachFile />
        </IconButton>
        <IconButton>
          <MoreVert />
        </IconButton>
      </div>
     </div>

  <div className="chat__body">

  {messages?.map(message => (
    <p className={`chat__message ${message.name === user.displayName && "chat__reciever"}`}>
  <span className='chat__name'>{message.name}</span>
{message.message}
{message.timestamp ? (
  <span className='chat__timestamp'>{new Date(message.timestamp?.toDate()).toUTCString()}</span>
) : (<CircularProgress size="1.2rem" />)}
</p>
  
  ))}
  



  </div>
    <div className="chat__footer">
    <IconButton>
      <InsertEmoticon />
      </IconButton>
      <form>
        <input value={input} onChange={ e => setInput(e.target.value)} type="text" placeholder='Type a message' />
        <button type='submit' onClick={sendMessage}>Send a message</button>
      </form>
      <IconButton>
      <Mic />
      </IconButton>
    </div>
    </div>
  )
}

export default Chat