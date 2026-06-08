import { useState, useEffect, useRef } from 'react'
import { Chatbot } from 'supersimpledev'
import RobotProfileImage from './assets/robot.png'
import UserProfileImage from './assets/user.png'
import LoadingGif from './assets/loading-spinner.gif'
import './App.css'

      function ChatInput({chatMessages, setChatMessages}) {
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

      function ChatMessage({message, sender}) {
        //const message = props.message;
        //const sender = props.sender;
        //const {message} = props;
        //const {sender} = props;

        return (
          <div className={sender === 'user' ? 'chat-message-user' : 'chat-message-robot'}>
            {sender === 'robot' && (
              <img src={RobotProfileImage} width="50" />
            )}
            <div className="chat-message-text">
              {message}
            </div>
            {sender === 'user' && (
              <img src={UserProfileImage} width="50" />
            )}
          </div>
        );
      }

      function ChatMessages({chatMessages}) {
        const chatMessagesRef = useAutoScroll(chatMessages);
        return (
          <div className="chat-message-container" ref={chatMessagesRef}>
            {chatMessages.map(chatMessage => {
              return(
                <ChatMessage 
                  message={chatMessage.message}
                  sender={chatMessage.sender}
                  key={chatMessage.id}
                />
              );
            })}
          </div>
        );
      }

      function useAutoScroll(dependencies) {
        const chatMessagesRef = useRef(null);

        useEffect(() => {
          const containerElem = chatMessagesRef.current;
          if (containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight;
          }
        }, [dependencies]);

        return chatMessagesRef;
      }

function App() {
        const [chatMessages, setChatMessages] = useState([]);
        // const [chatMessages, setChatMessages] = array;
        // const chatMessages = array[0]; Primeiro elemento do array de useState são os dados atuais salvos
        // const setChatMessages = array[1]; O segundo elemento é uma função que atualiza os dados juntamente com o HTML (sempre colocar set no começo do nome)
        
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
