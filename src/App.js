import './App.css';
import Taskbar from "./components/Taskbar";
import Apps from './components/Apps';
const App = () => {

  return (
    <>
      <Taskbar />
      <Apps />
      <h5 id='programName'>EncryptDecrypt</h5>
    </>
  )
}

export default App;
