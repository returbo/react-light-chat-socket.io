import React from 'react';
import socket from "./socket";
import axios from "axios";

import { Chat, JoinBlock } from "./components";
import reducer from "./reducer";


export default function App() {

  const [state, dispatch] = React.useReducer(reducer, {
    isJoin: false,
    roomId: null,
    userName: null,
    users: [],
    messages: []
  });

  const onLogin = async obj => {
    dispatch({
      type: "JOINED",
      payload: obj,
    });
    socket.emit('ROOM:JOIN', obj);
    const { data } = await axios.get(`/rooms/${obj.roomId}`);
    dispatch({
      type: "SET_DATA",
      payload: data,
    })
  };

  const setUsers = users =>
    dispatch({
      type: "SET_USERS",
      payload: users
    });

  const addMessage = message =>
    dispatch({
      type: "NEW_MESSAGE",
      payload: message,
    })

  React.useEffect(() => {
    socket.on("ROOM:SET_USERS", setUsers);
    socket.on("ROOM:NEW_MESSAGE", addMessage);
  }, []);

  return (
    <div className="App">
      {!state.isJoin
        ? <JoinBlock onLogin={onLogin} />
        : <Chat {...state} onAddMessage={addMessage} />
      }
    </div>
  );
}
