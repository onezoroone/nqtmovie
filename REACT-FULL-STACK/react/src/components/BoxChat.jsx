import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import Pusher from "pusher-js";
import { ProgressSpinner } from 'primereact/progressspinner';

function BoxChat() {
    const {idUser, token, setNotification} = useStateContext()
    const [messages, setMessages] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        const fetchData = async () => {
            const currentUrl = window.location.pathname;
            const id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
            if(currentUrl == '/'){
                const response = await axiosClient.post('/getMessages');
                setMessages(response.data)
            }else if(currentUrl.includes('/tap-')){
                const response = await axiosClient.post(`/getMessagesMovie/${id}`);
                setMessages(response.data)
            }else{
                const response = await axiosClient.post(`/getMessages/${id}`);
                setMessages(response.data)
            }
        }
        fetchData();
        // axiosClient.post('/getMessages')
        // .then((response) => setMessages(response.data))
        Pusher.logToConsole = false;
        const pusher = new Pusher('965865056288a2556707', {
            cluster: 'ap1'
        });
        const channel = pusher.subscribe('NQTMOVIE');
        channel.bind('chat', function () {
            fetchData();
            setLoading(false)
        });
    },[])
    const handleInputChange = (event) => {
        setNewMessage(event.target.value);
    };
    const handleSendMessage = (e) => {
        e.preventDefault()
        if(token){
            if (newMessage.trim() !== '') {
                setNewMessage('');
                const payload = {
                    message: newMessage,
                    idUser: idUser
                }
                setLoading(true);
                axiosClient.post('/addMessage', payload)
                const boxmessages = document.getElementById('box-messages');
                boxmessages.scrollTo({ top: boxmessages.scrollHeight, behavior: 'smooth' });
            }
        }else{
            setNotification(`Bạn cần đăng nhập để sử dụng tính năng này!`, 'text-bg-danger', 'bi-exclamation-triangle');
        }
    };
    return (
    <div style={{padding: '10px'}}>
        <h2 className="text-white">Box chat</h2>
        <div style={{border: '1px solid #ccc', borderRadius: '10px'}}>
            <div className="box-messages" id="box-messages" style={{height: '400px', padding: '10px', overflowY: 'auto', color: '#fff' }}>
                {messages && messages.map((item, index) => (
                <div className="d-flex w-100" key={index} style={{marginBottom: '5px', justifyContent: item.sender === Number(idUser) ? 'end' : 'start'}}>
                    {item.sender !== Number(idUser) && <img src={`${window.location.origin}/api/images/uploads/${item.img}`} alt={item.username} width="40px" height="40px" style={{borderRadius:'50%'}}/>}
                    <span style={{background: '#403c3c', borderRadius:'20px', padding:'10px', margin:'0 5px'}}>
                        <b className="text-uppercase">{item.username}</b> <br />
                        {item.message}
                    </span>
                    {item.sender === Number(idUser) && <img src={`${window.location.origin}/api/images/uploads/${item.img}`} alt={item.username} width="40px" height="40px" style={{borderRadius:'50%'}}/>}
                </div>
                ))}
            </div>
            <div style={{padding:'10px'}}>
                <form onSubmit={handleSendMessage}>
                    <div className="chatbox" style={{background: '#403c3c', borderRadius: '10px', padding:'10px', marginBottom: '10px'}}>
                        <div className="d-flex">
                            <input className="w-100 messages" placeholder="Viết bình luận..." style={{border:'none',outline:'none', background: 'transparent'}} type="text" value={newMessage} onChange={handleInputChange} />
                            {loading ? <ProgressSpinner style={{width: '20px', height: '20px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration="1.5s" />
                            : <button className="send-messages" style={{border:'none', background: 'transparent'}} type="submit" ><i className="bi bi-send text-white"></i></button>}
                        </div>
                        <div>
                            <i className="bi bi-emoji-smile text-white"></i>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
}

export default BoxChat;
