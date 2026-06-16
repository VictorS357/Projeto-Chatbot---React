import RobotProfileImage from '../assets/robot.png'
import UserProfileImage from '../assets/user.png'
import UserProfileImage2 from '../assets/profile-1.jpg'
import dayjs from 'dayjs';
import './ChatMessage.css';

export function ChatMessage({message, sender, time}) {
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
            <div className="chat-message-time">
                {dayjs(time).format('HH:mm')}
            </div>
        </div>
        {sender === 'user' && (
            <img src={UserProfileImage} width="50" />
        )}
        </div>
    );
}