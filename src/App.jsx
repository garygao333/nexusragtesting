import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import SourceView from './pages/SourceView';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/source/:filename" element={<SourceView />} />
      </Routes>
    </Router>
  );
}

export default App;
