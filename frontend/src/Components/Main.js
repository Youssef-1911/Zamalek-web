import { useState } from "react";
import Home from "./Home";
import NavBar from "./NavBar";
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm'
import AdminPage from'./AdminPage'

const Main = ()=>{
    let [page,setPage]=useState('home');
    let currentPage;
    if(page==='home')
        currentPage=<Home/>
    else if(page==='login')
        currentPage=<LoginForm navigate={setPage}/>
    else if (page==='register')    
        currentPage=<RegistrationForm/>
        else if(page==='admin-page')
            currentPage=<AdminPage/>
    return(
        <div>
        <NavBar navigate={setPage}/>
        {currentPage}
        </div>
    );
}
export default Main;