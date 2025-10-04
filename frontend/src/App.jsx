import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import { BrowserRouter ,Routes,Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Voyager from './components/Voyager'
import CateringPage from './components/CateringPage';
import StationeryPage from './components/StationeryPage';
import BeautyParlour from './components/BeautyParlour';
import PartyPage from './components/PartyPage';
import Supervisor from './head/Supervisor';
import HeadCook from './head/HeadCook';
import Summary from './components/Summary';
import Manager from './head/Manager';



function App() {
  

  return (
    <>
     <BrowserRouter>
       <Routes>
         <Route path="/" element ={<Login/>}/>
         <Route path="/voyager" element={<Voyager/>}/>
         <Route path="/catering" element={<CateringPage/>}/>
         <Route path="/stationery" element={<StationeryPage/>}/>
         <Route path="/beauty" element={<BeautyParlour/>}/>
         <Route path="/party" element={<PartyPage/>}/>
         <Route path="/supervisor" element={<Supervisor/>}/>
         <Route path="/headcook" element={<HeadCook/>}/>
         <Route path='/summary' element={<Summary/>}/>
         <Route path="/manager" element={<Manager/>}/>
       </Routes>
       
     </BrowserRouter>
      
    </>
  )
}

export default App
