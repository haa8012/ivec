import React from 'react';
import './App.css';
import FileUpload from './components/FileUpload';

function App() {
  return (
    <div className='App'>
      <div className='navbar'>
        <div style={{ paddingTop: 10 }}>Image Vectorizer</div>
      </div>
      <div className='container'>
        <FileUpload />
      </div>
    </div>
  );
}

export default App;
