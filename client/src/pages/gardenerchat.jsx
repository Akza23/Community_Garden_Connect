import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import GardenerNavbar from '../components/gardenernavbar';
import "../style/gardener.css";
import instance from '../utils/apiClient';

function GardenerChat() {
    const navigate = useNavigate()
    const [sc, setSc] = useState(null)
    const [details, setDetails] = useState([])
    const [manager, getManager] = useState([])
    const [refresh, setRefresh] = useState(true)
    const [id, setId] = useState()
    const msg = useRef("")
    const [data, setData] = useState({ chat: "" })
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:3000');
        socket.addEventListener('open', event => {
            console.log('WebSocket connection established!');
            setSc(socket)
            socket.addEventListener("message", (msg) => {
                console.log(msg,details);
                setDetails([...details,JSON.parse(msg.data)])
            })
            let token = localStorage.getItem("TOKEN")
            socket.send("id:" + token)
        });
        socket.addEventListener('close', event => {
            console.log('WebSocket connection closed:', event.code, event.reason);
        });
        socket.addEventListener('error', error => {
            console.error('WebSocket error:', error);
        });
        
        let token = localStorage.getItem("TOKEN")
        if (!token) {
            navigate("/gardenerlogin")
        }
    }, [id,details])
    let send = useCallback(
        function () {
            if (sc) {
                let token = localStorage.getItem("TOKEN")
                console.log(msg);
                let message = {
                    id,
                    data: { chat: msg.current },
                    token
                }
                sc.send(JSON.stringify({ ...message }))
                setData({chat:""})
            }
        }, [data])

    async function viewManager() {
        const response = await instance.get("/gardener/viewmanager")
        getManager(response.data.chat)
    }
    useEffect(() => {
        viewManager()
    }, [])

    function getName(_id) {
        setId(_id)
    }

    function message(e) {
        console.log({ [e.target.name]: e.target.value });
        setData({ ...data, [e.target.name]: e.target.value })
        msg.current = e.target.value
    }

    async function messageView() {
        const res = await instance.get("/manager/viewchat/" + id)
        setDetails(res.data.chat)
    }
    useEffect(() => {
        console.log('h ');
        messageView()
    }, [id, refresh])

    return (
        <>
            <GardenerNavbar />
            <div className='chat-container'>
                <div className="manager-list">
                    {manager.map((item) => {
                        return (
                            <button className={`manager-button ${item._id === id && "chat-focus"}`} onClick={() => getName(item._id)}>{item.fullName}</button>
                        )
                    })}
                </div>
                <div className='chat-area'>
                    <div className='chat-messages'>
                        {details.map((item) => {
                            return (
                                <div className={`chat-bubble ${item.sender === "gardener" ? "my-chat" : "their-chat"}`}>
                                    <p>{item.message}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className='chat-input-area'>
                        <input onChange={message} value={data.chat} type="text" name='chat' />
                        <button onClick={send}>SEND</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GardenerChat