import ReactDOM  from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from './components/users1'






export default function Router() {
    
   
       return (
         <BrowserRouter>
           <Routes> 
             <Route path="/" element={<Users/>} />
             <Route path="/users" element={<Users/>} />
           </Routes>
         </BrowserRouter>
       );
     }