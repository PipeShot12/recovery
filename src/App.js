import { useState } from 'react';
import './App.css';
import Welcome from './components/Welcome'
import File from './components/File'
function App() {
  const [newFiles,setNewFiles] = useState(false);

  return (
    <div className="App">
      {newFiles ? <File/> : <Welcome createFiles={setNewFiles}/>}
    </div>
  );
}

export default App;
