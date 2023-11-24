// import React, { useEffect, useState } from 'react'
// import {over} from 'stompjs';
// import SockJS from 'sockjs-client';
// import './/Chat.css';
// import axios from "axios";
//
//
// var stompClient =null;
// const ChatRoom = () => {
//     const [publicChats, setPublicChats] = useState([]);
//     const [tab, setTab] = useState("CHATROOM");
//     const receiverId = localStorage.getItem("idAccByShop")
//     const senderId = localStorage.getItem("account")
//     const [privateChats, setPrivateChats] = useState([]);
//     const [userData, setUserData] = useState({
//         senderId: senderId,
//         receiveId: "",
//         connected: false,
//         message: ''
//     });
//
//     const fetchSavedPrivateMessages = async () => {
//         try {
//             const response = await axios.get(`http://localhost:8080/api/${senderId}/${receiverId}`);
//             const savedMessages = response.data;
//             console.log('message:', savedMessages);
//
//             const updatedPrivateChats = privateChats.find(chat => chat.receiverId === receiverId);
//             if (updatedPrivateChats) {
//                 updatedPrivateChats.messages = savedMessages;
//             } else {
//                 setPrivateChats([...privateChats, { receiverId, messages: savedMessages }]);
//             }
//         } catch (error) {
//             console.error('Error', error);
//         }
//     };
//
//
//     const connect = () => {
//         let Sock = new SockJS('http://localhost:8080/ws');
//         stompClient = over(Sock);
//         setUserData({...userData, receiverId});
//         fetchSavedPrivateMessages().then(() => {
//             console.log("privateChat", privateChats)
//         });
//
//         stompClient.connect({}, onConnected, onError);
//
//     };
//
//
//     const onConnected = () => {
//         setUserData({...userData, "connected": true});
//         stompClient.subscribe('/chatroom/public', onMessageReceived);
//         stompClient.subscribe('/user/' + userData.senderId + '/private', onPrivateMessage);
//         userJoin();
//     }
//
//     const userJoin = () => {
//         var chatMessage = {
//             senderId: userData.senderId,
//             status: "JOIN"
//         };
//         stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
//     }
//
//     const onMessageReceived = (payload) => {
//         var payloadData = JSON.parse(payload.body);
//         console.log("payloadBody", payload.body)
//         switch (payloadData.status) {
//             case "JOIN":
//                 const existingPrivateChat = privateChats.find(chat => chat.receiverId === payloadData.senderId);
//                 if (!existingPrivateChat) {
//                     setPrivateChats([...privateChats, { receiverId: payloadData.senderId, messages: [] }]);
//                 }
//                 break;
//             case "MESSAGE":
//                 publicChats.push(payloadData);
//                 setPublicChats([...publicChats]);
//                 break;
//         }
//     }
//
//     const onPrivateMessage = (payload) => {
//         console.log("payload", payload);
//         var payloadData = JSON.parse(payload.body);
//         const existingPrivateChat = privateChats.find(chat => chat.receiverId === payloadData.senderId);
//         if (existingPrivateChat) {
//             existingPrivateChat.messages.push(payloadData);
//             setPrivateChats([...privateChats]);
//         } else {
//             const newChat = { receiverId: payloadData.senderId, messages: [payloadData] };
//             setPrivateChats([...privateChats, newChat]);
//         }
//     }
//
//     const onError = (err) => {
//         console.log(err);
//
//     }
//
//     const handleMessage = (event) => {
//         const {value} = event.target;
//         setUserData({...userData, "message": value});
//     }
//
//
//     const sendPrivateValue = () => {
//         if (stompClient) {
//             const chatMessage = {
//                 senderId: userData.senderId,
//                 receiverId: tab,
//                 message: userData.message,
//                 status: "MESSAGE",
//             };
//
//             if (userData.senderId !== tab) {
//                 const updatedChats = privateChats.map((chat) => {
//                     if (chat.receiverId === tab) {
//                         return {
//                             ...chat,
//                             messages: [...chat.messages, chatMessage],
//                         };
//                     }
//                     return chat;
//                 });
//                 setPrivateChats(updatedChats);
//             }
//             stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
//             setUserData({ ...userData, message: "" });
//         }
//     };
//
//
//     const registerUser = () => {
//         connect();
//     }
//
//     return (
//         <div className="container4">
//             {userData.connected ? (
//                 <div className="chat-box">
//                     <div className="member-list">
//                         <ul>
//                             {privateChats.map((chat, index) => (
//                                 <li
//                                     onClick={() => {
//                                         setTab(chat.receiverId);
//                                     }}
//                                     className={`member ${tab === chat.receiverId && "active"}`}
//                                     key={index}
//                                 >
//                                     {chat.receiverId}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                     {tab !== "CHATROOM" && (
//                         <div>
//                             <ul>
//                                 {privateChats
//                                     .find((chat) => chat.receiverId === tab)
//                                     ?.messages.map((chat, index) => (
//                                         <li
//                                             className={`message ${chat.senderId === senderId && 'self'}`}
//                                             key={index}
//                                         >
//                                             {chat.senderId !== senderId && (
//                                                 <div className="avatar">{chat.senderId}</div>
//                                             )}
//                                             <div className="message-data">{chat.message}</div>
//                                             {chat.senderId === senderId && (
//                                                 <div className="avatar self">{chat.senderId}</div>
//                                             )}
//                                         </li>
//                                     ))}
//                             </ul>
//                             <div className="send-message">
//                                 <input
//                                     type="text"
//                                     className="input-message"
//                                     placeholder="enter the message"
//                                     value={userData.message}
//                                     onChange={handleMessage}
//                                 />
//                                 <button
//                                     type="button"
//                                     className="send-button"
//                                     onClick={sendPrivateValue}
//                                 >
//                                     send
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             ) : (
//                 <div className="register2">
//                     <button
//                         className="btn btn-lg"
//                         type="button"
//                         onClick={registerUser}
//                     >
//                         connect
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }
// export default ChatRoom
