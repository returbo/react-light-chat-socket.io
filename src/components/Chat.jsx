import React from 'react';
import socket from '../socket';

function Chat({ users, messages, userName, roomId, onAddMessage }) {
  const [messageValue, setMessageValue] = React.useState('');
  const messagesRef = React.useRef(null);

  const onSendMessage = () => {
    socket.emit('ROOM:NEW_MESSAGE', {
      userName,
      roomId,
      text: messageValue,
    });
    onAddMessage({ userName, text: messageValue });
    setMessageValue('');
  }

  React.useEffect(() => {
    messagesRef.current.scroll(0, messagesRef.current.scrollHeight);
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat-users">
        <p>Комната: <b>{roomId}</b></p>
        <p>Онлайн: <b>{users.length}</b></p>
        <ul>
          <hr />
          {users.map((name, index) => 
            <li key={`${name}_${index}`}>{name}</li>
          )}
        </ul>
        <hr />
      </div>
      <div className="chat-messages">
        <div ref={messagesRef} className="messages">
          {messages.map((message, index) => 
            <div key={index} className="message">
              <p>
                <span className="message__name">{message.userName}:</span>
                <span className="message__text">{message.text}</span>
              </p>
            </div>
          )}
        </div>
        <form>
          <textarea
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            className="form-control"
            rows="3">
          </textarea>
          <button
            disabled={!messageValue}
            type="button"
            className="btn btn-primary"
            onClick={onSendMessage}
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  )
}

export default Chat;