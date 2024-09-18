import React, { useEffect, useRef } from 'react';
import { Canvas } from 'fabric';
import { db } from '../firebaseConfig'; // Import your firebase configuration
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import './Whiteboard.css'; // Create this CSS file for styling

function Whiteboard() {
  const canvasRef = useRef(null);
  const canvasId = 'whiteboardCanvas';

  useEffect(() => {
    const canvas = new Canvas(canvasId, { isDrawingMode: true });
    canvasRef.current = canvas;

    const docRef = doc(db, 'whiteboards', 'sharedCanvas');
    onSnapshot(docRef, (snapshot) => {
      const data = snapshot.data();
      if (data) {
        canvas.loadFromJSON(data.canvasState, canvas.renderAll.bind(canvas));
      }
    });

    canvas.on('object:modified', () => {
      const json = canvas.toJSON();
      setDoc(docRef, { canvasState: json });
    });

    return () => {
      canvas.dispose();
    };
  }, []);

  return (
    <div className="whiteboard">
      <canvas id={canvasId}></canvas>
    </div>
  );
}

export default Whiteboard;
