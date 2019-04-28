import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import axios from 'axios';
import QRCode from 'qrcode.react';
import Logo from './logo.png';

const box = {
  padding: '5vh',
  backgroundColor: 'white',
  borderRadius: '1vh'
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
    }
  }

  updateToken = () => {
    axios.get('/api/qr')
      .then(res => {
        if (res.data && res.data.token) {
          this.setState({ token: res.data.token });
        }
      });
  }

  componentDidMount() {
    var socketHost = 'http://localhost:5000';
    if (process.env.NODE_ENV === "production") {
      socketHost = 'https://breach-qr-fullstack.herokuapp.com/';
    }
    const socket = openSocket(socketHost);

    socket.on('UPDATE_TOKEN', () => {
      this.updateToken();
    })
    this.updateToken()
  }

  render() {
    console.log(this.state.token)
    return (
      <div className="vh-100 vw-100 d-flex flex-row justify-content-center align-items-center">
        <div className="d-flex flex-column align-items-center" style={box}>
          <div style={{ margin: '10px' }}>
            <QRCode value={this.state.token} size={128}/>
          </div>
          <div className="text-center">
            <h5>Scan This QR</h5>
            <h4>Complete Your Quest!</h4>
            <img src={Logo} alt='breach'/>
            <h4>Breach</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
