import { useState } from "react";
import Home from "./Home";
import NavBar from "./NavBar";
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm'
import AdminPage from'./AdminPage'
import UserPage from "./UserPage";
import AddPlayer from "./AddPlayer";
import AddProduct from "./AddProduct";
import DeletePlayer from "./DeletePlayer";
import ViewProduct from "./ViewProduct";
import DeleteProduct from "./DeleteProduct";
import UpdateProduct from "./UpdateProduct";
import Vieworders from "./ViewOrders";
import UpdateStatus from "./UpdateOrderStatus";
import ViewUsers from "./ViewUsers";
import Store from "./Store";
import Teamsquad from "./Teamsquad"
import Viewcart from "./Viewcart"


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
        else if(page==='user-page')
            currentPage=<UserPage navigate={setPage}/>   
            else if(page==='view-users')
                currentPage=<ViewUsers navigate={setPage}/>
            else if (page==='add-player')
                currentPage=<AddPlayer navigate={setPage}/>
            else if (page==='add-product')
                currentPage=<AddProduct navigate={setPage}/>
            else if (page==='delete-player')
                currentPage=<DeletePlayer navigate={setPage}/>
            else if (page==='view-products')  
                currentPage=<ViewProduct navigate={setPage}/> 
            else if (page==='delete-product') 
                currentPage=<DeleteProduct navigate={setPage}/>
            else if (page==='update-product')
                currentPage=<UpdateProduct navigate={setPage}/>
            else if (page==='view-orders ') 
                currentPage=<Vieworders navigate={setPage}/>   
            else if (page==='update-order')
                currentPage=<UpdateStatus navigate={setPage}/>
            else if(page==='store-products') 
                currentPage=<Store navigate={setPage}/> 
            else if (page==='view-players')  
                currentPage=<Teamsquad navigate={setPage}/>
            else if (page==='view-cart')   
                currentPage=<Viewcart navigate={setPage}/> 
    return(
        <div>
        <NavBar navigate={setPage}/>
        {currentPage}
        </div>
    );
}
export default Main;