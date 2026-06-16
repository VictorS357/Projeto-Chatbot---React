import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import dayjs from 'dayjs';
import ChatMessages from './ChatMessages';
import LoadingGif from '../assets/loading-spinner.gif'
import './ChatInput.css';


export function ChatInput({chatMessages, setChatMessages}) {
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function saveInputText(event) {
        setInputText(event.target.value);
    }

    async function sendMessage() {
        if(isLoading || inputText === '') {
        return;
        }

        setIsLoading(true);

        const newChatMessages = ([
        ...chatMessages,
        {
            message: inputText,
            sender: 'user',
            id: crypto.randomUUID(),
            time: dayjs().valueOf()
        }
        ]);

        setChatMessages(newChatMessages);

        setInputText('');
        setChatMessages([
        ...newChatMessages,
        {
            message: <img className="loading" src={LoadingGif} />,
            sender: 'robot',
            id: crypto.randomUUID(),
            time: dayjs().valueOf()
        }
        ]);


        const response = await Chatbot.getResponseAsync(inputText);
        setChatMessages([
        ...newChatMessages,
        {
            message: response,
            sender: 'robot',
            id: crypto.randomUUID(),
            time: dayjs().valueOf()
        }
        ]);
        setIsLoading(false);
    }

    function keyDown(event) {
        if(event.key === 'Enter') {
        sendMessage();
        } else if(event.key === 'Escape') {
        setInputText('');
        }
    }

    function clearMessages() {
        localStorage.removeItem('messages');
        setChatMessages([]);
    }

    return (
        <div className="chat-input-container">
        <input 
            placeholder="Send a message to Chatbot" 
            size="30"
            onChange={saveInputText} 
            value={inputText}
            onKeyDown={keyDown}
            className="chat-input"
        /> 
        <button
            onClick={sendMessage}
            className="send-btn"
        >Send</button>
        <button
            onClick={clearMessages}
            className="clear-btn"
        >Clear</button>
        </div>
    ); // '<> </>' é um fragmento. Permite com que retorne um elemento da função sem criar uma div extra
}