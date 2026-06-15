import RobotProfileImage from '../assets/robot.png'
import UserProfileImage from '../assets/user.png'
import UserProfileImage2 from '../assets/profile-1.jpg'
import './ChatMessage.css';

export function ChatMessage({message, sender}) {
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
            <img src={UserProfileImage2} width="50" />
        )}
        </div>
    );
}