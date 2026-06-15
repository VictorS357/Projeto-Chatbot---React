import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
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
            id: crypto.randomUUID()
        }
        ]);

        setChatMessages(newChatMessages);

        setInputText('');
        setChatMessages([
        ...newChatMessages,
        {
            message: <img className="loading" src={LoadingGif} />,
            sender: 'robot',
            id: crypto.randomUUID()
        }
        ]);


        const response = await Chatbot.getResponseAsync(inputText);
        setChatMessages([
        ...newChatMessages,
        {
            message: response,
            sender: 'robot',
            id: crypto.randomUUID()
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
        </div>
    ); // '<> </>' é um fragmento. Permite com que retorne um elemento da função sem criar uma div extra
}