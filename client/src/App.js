import './App.css';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import Home from './React components/Home/Home';
import Nav from './React components/Nav/Nav'
import LandingPage from './React components/Landing Page.js/LandingPage';
import Detail from './React components/Detail/Detail'
import Form from './React components/Form/Form';
import Search from './React components/Search/Search';



const App = ()=> {
  const location = useLocation();
  const navigate = useNavigate();

  const goToHome = ()=>{
    navigate('/home')
  }

  return (
    <div className='App'>
    {location.pathname === '/' ? <LandingPage goToHome={goToHome} /> :<Nav /> }
    <Routes>  
      <Route path='/home' element={<Home />}/>
      <Route path='/search' element={<Search/>} />
      <Route path='/detail/:id' element={<Detail />} />
      <Route path='/form' element={<Form />} />
    </Routes>
    </div>
    
  );
}


export default App;
