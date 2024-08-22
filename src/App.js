import './App.css';
import Home from './Components/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NavBar from './Components/NavBar';
import About from './Components/About';
import NoteState from './Context/notes/NoteState';

function App() {
  return (
    <>
    <NoteState>
    <Router>
      <NavBar/>
      
      <div className="container">
      <Routes>
          <Route  path="/" element={<Home/>}/>
          <Route   path="/about" element={<About/>}/>
        </Routes>
      </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;