import './App.css';
import Sidebar from "./components/Sidebare";
import Income from './components/Income';
function App() {
  return (
    <div className="container">
     <Sidebar/>
     <div className="main-content">
       <Income/>
     </div>

    </div>
  )
}

export default App;
