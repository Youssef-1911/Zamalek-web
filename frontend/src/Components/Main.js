import { useState } from "react";
import Home from "./Home";
import NavBar from "./NavBar";
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm'
import AdminPage from'./AdminPage'
import AddPlayer from "./AddPlayer";
import AddProduct from "./AddProduct";
import DeletePlayer from "./DeletePlayer";
import ViewProduct from "./ViewProduct";
import DeleteProduct from "./DeleteProduct";
import UpdateProduct from "./UpdateProduct";
import Vieworders from "./ViewOrders";
import UpdateStatus from "./UpdateOrderStatus";
import ViewUsers from "./ViewUsers";


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
            currentPage=<AdminPage navigate={setPage}/>
            else if(page==='view-users')
                currentPage=<ViewUsers/>
            else if (page==='add-player')
                currentPage=<AddPlayer/>
            else if (page==='add-product')
                currentPage=<AddProduct/>
            else if (page==='delete-player')
                currentPage=<DeletePlayer/>
            else if (page==='view-products')  
                currentPage=<ViewProduct/> 
            else if (page==='delete-product') 
                currentPage=<DeleteProduct/>
            else if (page==='update-product')
                currentPage=<UpdateProduct/>
            else if (page==='view-orders') 
                currentPage=<Vieworders/>   
            else if (page==='update-order')
                currentPage=<UpdateStatus/>
    return(
        <div>
        <NavBar navigate={setPage}/>
        {currentPage}
        </div>
    );
}
export default Main;