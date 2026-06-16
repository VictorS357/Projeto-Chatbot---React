import { useState, useEffect } from 'react'
import { ChatInput  } from './components/ChatInput';
import { ChatMessage } from './components/ChatMessage';
import ChatMessages  from './components/ChatMessages';
import { Chatbot } from 'supersimpledev'
import './App.css'

function App() {
  const [chatMessages, setChatMessages] = useState([]);
  // const [chatMessages, setChatMessages] = array;
  // const chatMessages = array[0]; Primeiro elemento do array de useState são os dados atuais salvos
  // const setChatMessages = array[1]; O segundo elemento é uma função que atualiza os dados juntamente com o HTML (sempre colocar set no começo do nome)
  
  useEffect(() => {
    Chatbot.addResponses({
      Fernanda: 'Amor da minha vida'
    });
  }, []);

  return (
  <div className="app-container">
    {chatMessages.length === 0 && (
      <p className="welcome-p">Welcome to the chatbot project! Send a message using the textbox below.</p>
    )}
    <ChatMessages
      chatMessages={chatMessages}
    /> 
    <ChatInput
      chatMessages={chatMessages}
      setChatMessages={setChatMessages}
    />
  </div>
  );
}

export default App
