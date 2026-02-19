import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import ManagerNavbar from '../components/managernavbar'
import "../style/manager.css"
import instance from '../utils/apiClient'

function ManagerViewChat() {
    const Navigate = useNavigate()
    const [details, setDetails] = useState([])
    const [sc, setSc] = useState(null)
    const [gardener, getGardener] = useState([])
    const [id, setId] = useState()
    const [refresh, setRefresh] = useState(true)
    const msg = useRef("")
    const [data, setData] = useState({ chat: "" })
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:3000');
        socket.addEventListener('open', event => {
            console.log('WebSocket connection established!');
            setSc(socket)
            socket.addEventListener("message", (msg) => {
                console.log(msg, details)
                setDetails([...details, JSON.parse(msg.data)])
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
            navigate("/managerlogin")
        }
    }, [id, details])
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
                setData({ chat: "" })
            }
        }, [data])
    async function viewGardener() {
        const response = await instance.get("/manager/viewgardener")
        getGardener(response.data.gardener)
    }
    useEffect(() => {
        viewGardener()
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
        messageView()
    }, [id, refresh])
    return (
        <>
            <ManagerNavbar />
            <div className='manager-chat-container'>
                <div className="manager-list-container">
                    {gardener.map((item) => {
                        return (
                            <button className={`manager-button ${item._id === id && "manager-chat-focus"}`} onClick={() => getName(item._id)}>{item.fullName}</button>
                        )
                    })}
                </div>
                <div className='manager-chat-area'>
                    <div className='manager-chat-messages'>
                        {details.map((item) => {
                            return (
                                <div className='manager-chat'>
                                    <p>{item.message}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className='manager-chat-input-area'>
                        <input onChange={message} value={data.chat} type="text" name='chat' />
                        <button onClick={send}>SEND</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ManagerViewChat