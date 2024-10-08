
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import RightSidebar from './components/RightSidebar';


function App() {
  return (
    <div className="font-sans">
      <Navbar />
    
      <div className="flex">
        <Sidebar />
        <MainContent />
       
      </div>
    </div>
  );
}

export default App;
