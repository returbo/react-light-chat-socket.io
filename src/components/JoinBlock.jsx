import React from 'react';
import axios from 'axios';


export default function JoinBlock({ onLogin }) {
  const [roomId, setRoomId] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [isLoading, setLoading] = React.useState(false)

  const onEnter = async () => {
    if (!roomId || !userName) {
      return alert('Заполните поля ввода!')
    }
    const obj = {
      roomId,
      userName,
    }
    setLoading(true);
    await axios.post('/rooms', obj);
    onLogin(obj);
  };

  return (
    <div className="wrapper">
      <div className="wrapper__block">
        <div className="input-group flex-nowrap">
          <div className="input-group-prepend">
            <span className="input-group-text" id="addon-wrapping">Room ID</span>
          </div>
          <input 
            maxLength={3}
            type="text" 
            className="form-control" 
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          ></input>
        </div>
      </div>
      <div className="wrapper__block">
        <div className="input-group flex-nowrap">
          <div className="input-group-prepend">
            <span className="input-group-text" id="addon-wrapping">Your name</span>
          </div>
          <input 
            maxLength={10}
            type="text" 
            className="form-control" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)}
          ></input>
        </div>
      </div>
      <button 
        disabled={isLoading}
        type="button" 
        className="btn btn-secondary btn-lg btn-block"
        onClick={onEnter}
      >{isLoading ? 'ВХОД...' : 'ВОЙТИ'}
      </button>
    </div>
  )
}
