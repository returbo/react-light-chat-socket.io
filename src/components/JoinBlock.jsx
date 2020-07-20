import React from 'react'
import socket from '../socket';


export default function JoinBlock() {
  return (
    <div className="wrapper">
      <div className="wrapper__block">
        <div className="input-group flex-nowrap">
          <div className="input-group-prepend">
            <span className="input-group-text" id="addon-wrapping">Room ID</span>
          </div>
          <input type="text" className="form-control"></input>
        </div>
      </div>
      <div className="wrapper__block">
        <div className="input-group flex-nowrap">
          <div className="input-group-prepend">
            <span className="input-group-text" id="addon-wrapping">Your name</span>
          </div>
          <input type="text" className="form-control"></input>
        </div>
      </div>
      <button type="button" className="btn btn-secondary btn-lg btn-block">ВОЙТИ</button>
    </div>
  )
}
