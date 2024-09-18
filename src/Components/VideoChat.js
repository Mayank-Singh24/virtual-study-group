import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import io from 'socket.io-client';
import './VideoChat.css'; // Create this CSS file for styling

const socket = io('http://localhost:5000'); // Replace with your server URL

function VideoChat() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);
  const [peerId, setPeerId] = useState('');

  useEffect(() => {
    peerRef.current = new Peer(undefined, {
      host: '/',
      port: '5000',
    });

    peerRef.current.on('open', (id) => {
      setPeerId(id);
    });

    peerRef.current.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          call.answer(stream);
          call.on('stream', (remoteStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
            }
          });
        });
    });

    socket.on('offer', (data) => {
      peerRef.current.setRemoteDescription(new RTCSessionDescription(data.offer));
      peerRef.current.createAnswer()
        .then((answer) => {
          socket.emit('answer', { answer });
        });
    });

    socket.on('answer', (data) => {
      peerRef.current.setRemoteDescription(new RTCSessionDescription(data.answer));
    });

    socket.on('ice-candidate', (data) => {
      peerRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
    });

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      });

    return () => {
      peerRef.current.destroy();
    };
  }, []);

  const callPeer = (id) => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        const call = peerRef.current.call(id, stream);
        call.on('stream', (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        });
      });
  };

  return (
    <div className="video-chat">
      <video ref={localVideoRef} autoPlay muted></video>
      <video ref={remoteVideoRef} autoPlay></video>
      <input
        type="text"
        value={peerId}
        readOnly
        className="peer-id"
      />
      <button onClick={() => callPeer(prompt('Enter peer ID'))}>Call Peer</button>
    </div>
  );
}

export default VideoChat;
