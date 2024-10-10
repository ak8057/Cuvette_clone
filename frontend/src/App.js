
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
// import MainContent from './components/MainContent';
// import RightSidebar from './components/RightSidebar';
// import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes'; 


function App() {
  return (
    <div className="font-sans">
      <Navbar />
    
      <div className="flex">
        <Sidebar />
        <AppRoutes />

       
      </div>
    </div>
  );
}

export default App;
