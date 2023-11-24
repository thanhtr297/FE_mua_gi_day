import React, {useEffect, useRef, useState} from 'react';
import UserService from "../../service/ChatService";
import {toast} from "react-toastify";
import {useWebSocket} from "../../Context/WebSocketContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './/chatRomm.css';

const ChatRoom = () => {
    const [listFriendChat, setListFriendChat] = useState([]);
    const [listFriendInChat, setListFriendInChat] = useState([]);
    const messageInputRef = useRef(null);
    const [newMessage, setNewMessage] = useState('');
    const [idToUser, setIdToUser] = useState([]);
    const [load, setLoad] = useState(true);
    let id = localStorage.getItem("account");
    const webSocket = useWebSocket();
    useEffect(() => {
        if (webSocket) {
            webSocket.subscribe('/chat/user/queue/position-update', async (message) => {
                const msg = JSON.parse(message.body);
                let principal = {
                    id: msg.fromUser.id,
                    username: msg.fromUser.username,
                };
                try {
                    const response = await UserService.messageAllInFriend(msg.toUser.id, principal);
                    setListFriendInChat(response.data);
                } catch (error) {
                    toast.warning("Failed to find friend messages!");
                }
                setLoad(true)
            });
        }
    }, [webSocket]);
    useEffect(() => {
        if (load) {
            var objDiv = document.getElementById("list-message-container");
            objDiv.scrollTop = objDiv.scrollHeight;
        }
    }, [load]);
    useEffect(() => {
        UserService.messageAllFriend(localStorage.getItem("account"))
            .then((response) => {
                response.data.sort((a, b) => {
                    return new Date(b.time) - new Date(a.time);
                });
                setListFriendChat(response.data);
                setLoad(false)
            })
            .catch((error) => {
                toast.warning("not find by message!");
            });
    }, [load]);
    const messageInFriend = async (toUserId, userName) => {
        let principal = {
            id: localStorage.getItem("account"),
            username: userName
        }
        setIdToUser(toUserId)
        try {
            const response = await UserService.messageAllInFriend(toUserId, principal);
            setListFriendInChat(response.data);
            setLoad(true)
        } catch (error) {
            toast.warning("do not find friend message !")
            await error;
        }
    }
    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
    }
    const handleSendMessage = async () => {
        if (newMessage.trim() !== '') {
            let message = {
                fromUser: {id:localStorage.getItem("account")},
                toUser: {id:idToUser},
                content: newMessage,
            };
            try {
                const response = await UserService.sendMessage(message);
                console.log(response);
                if (webSocket.readyState === WebSocket.OPEN) {
                    webSocket.send(JSON.stringify({
                        type: 'message',
                        content: message,
                    }));
                }
                setNewMessage('');
            } catch (error) {
                toast.warning("Failed to send message!");
            }
        }
    }


    function calculateTimeChat(createdAt) {
        const currentTime = new Date();
        const postedTime = new Date(createdAt);
        const timeDiff = currentTime - postedTime;
        if (timeDiff < 60000) {
            return Math.floor(timeDiff / 1000) + " seconds ago";
        } else if (timeDiff < 3600000) {
            return Math.floor(timeDiff / 60000) + " minutes ago";
        } else if (timeDiff < 86400000) {
            return Math.floor(timeDiff / 3600000) + " hours ago";
        } else if (timeDiff < 2592000000) {
            return Math.floor(timeDiff / 86400000) + " days ago";
        } else if (timeDiff < 31536000000) {
            return Math.floor(timeDiff / 2592000000) + " months ago";
        } else {
            return Math.floor(timeDiff / 31536000000) + " years ago";
        }
    }
    const handleLogout = () => {
        localStorage.removeItem("idAccount");

    }
    return (
        <div className={"controls1"}>
            <button id={"logout-btn"} onClick={() => handleLogout()} >
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
            <div className={"transparent-background"}>
                <div id={"nav-bar-left"}>
                    {listFriendChat.map((m) => (
                        <div className={"friend-list-message"}
                             onClick={() => messageInFriend(m.toUser.id == id ? m.fromUser.id : m.toUser.id, m.toUser.id == id ? m.toUser.username : m.fromUser.username)}>
                            <div className={"flm-1"}>
                                {m.toUser.id == id ? <img className={"img-toUser"} src={m.fromUser.image} alt=""/> :
                                    <img className={"img-toUser"} src={m.toUser.image} alt=""/>}
                                <p className={"flm-time"}>{calculateTimeChat(m.time)}</p>
                            </div>
                            <div className={"flm-2"}>
                                {m.toUser.id == id ? <p className={"p-user-name"}>{m.fromUser.username}</p> :
                                    <p className={"p-user-name"}>{m.toUser.username}</p>}
                                <p className={"p-content"}>{m.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div id={"div-right"}>
                    {listFriendInChat != null ? (
                            <div>
                                <div id={"list-message-container"}>
                                    {listFriendInChat.map((m) => (
                                        m.toUser.id == id ?
                                            (<div className={"content-message-you"}>
                                                {m.toUser.id == id ?
                                                    <img src={m.fromUser.image} className={"img-message-you"} alt=""/> :
                                                    <img src={m.toUser.image} className={"img-message-you"} alt=""/>}
                                                <p className={"message-content-you"}>{m.content}</p>
                                            </div>) :
                                            (<div className={"content-message-me"}>
                                                {m.toUser.id == id ?
                                                    <img src={m.toUser.image} className={"img-message-me"} alt=""/> :
                                                    <img src={m.fromUser.image} className={"img-message-me"} alt=""/>}
                                                <p className={"message-content-me"}>{m.content}</p>
                                            </div>)
                                    ))}
                                </div>
                                <div className="message-input-container">
                                    <input id={"send-message-input"}
                                           ref={messageInputRef}
                                           type="text"
                                           value={newMessage}
                                           onChange={handleNewMessageChange}
                                           placeholder=" Type a message..."
                                    />
                                    <button onClick={() => handleSendMessage()} id={"send-message-button"}>Send</button>
                                </div>
                            </div>
                        ) :
                        <h4>Hãy Chọn Người Dùng muốn nhắn tin !</h4>}
                </div>
            </div>
        </div>
    );
};

export default ChatRoom;