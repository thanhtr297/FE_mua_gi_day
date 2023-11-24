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
//     const [privateChats, setPrivateChats] = useState(new Map());
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
//             const updatedPrivateChats = new Map(privateChats);
//             updatedPrivateChats.set(receiverId, savedMessages);
//             setPrivateChats(updatedPrivateChats);
//         } catch (error) {
//             console.error('Error', error);
//         }
//     };
//
//     // const fetchSavedPrivateMessages =  () => {
//     //     axios.get(`http://localhost:8080/api/${senderId}/${receiverId}`).then((res) => {
//     //         return setPrivateChats(res.data);
//     //     },[])
//     // };
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
//                 if (!privateChats.get(payloadData.senderId)) {
//                     privateChats.set(payloadData.senderId, []);
//                     setPrivateChats(new Map(privateChats));
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
//         if (privateChats.get(payloadData.senderId)) {
//             privateChats.get(payloadData.senderId).push(payloadData);
//             setPrivateChats(new Map(privateChats));
//         } else {
//             let list = [];
//             list.push(payloadData);
//             privateChats.set(payloadData.senderId, list);
//             setPrivateChats(new Map(privateChats));
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
//             var chatMessage = {
//                 senderId: userData.senderId,
//                 receiverId: tab,
//                 message: userData.message,
//                 status: "MESSAGE"
//             };
//
//             if (userData.senderId !== tab) {
//                 privateChats.get(tab).push(chatMessage);
//                 setPrivateChats(new Map(privateChats));
//             }
//             stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
//             setUserData({...userData, "message": ""});
//         }
//     }
//
//
//     const registerUser = () => {
//         connect();
//     }
//
//     return (
//         <div className="container4">
//             <p>Chat {console.log(privateChats)}</p>
//             {userData.connected ? (
//                 <div className="chat-box">
//                     <div className="member-list">
//                         <ul>
//                             {[...privateChats.keys()].map((name, index) => (
//                                 <li
//                                     onClick={() => {
//                                         setTab(name);
//                                     }}
//                                     className={`member ${tab === name && "active"}`}
//                                     key={index}
//                                 >
//                                     {name}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                     {tab !== "CHATROOM" && (
//                         <div>
//                             {/**/}
//                             <ul>
//                                 {privateChats.get(tab)?.map((chat, index) => (
//                                     <li
//                                         className={`message ${chat.senderId === senderId && 'self'}`}
//                                         key={index}
//                                     >
//                                         {chat.senderId !== senderId && (
//                                             <div className="avatar">{chat.senderId}</div>
//                                         )}
//                                         <div className="message-data">{chat.message}</div>
//                                         {chat.senderId === senderId && (
//                                             <div className="avatar self">{chat.senderId}</div>
//                                         )}
//                                     </li>
//                                 ))}
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
