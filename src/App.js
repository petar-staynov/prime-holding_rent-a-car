import React from 'react';
import './App.css';
import Navigationbar from "./components/navbar/Navigationbar";
import HomePage from "./components/pages/HomePage";
import {Switch, Route} from "react-router-dom";
import VehiclesPage from "./components/pages/vehicles/VehiclesPage";
import RentPage from "./components/pages/RentPage";
import CustomersPage from "./components/pages/CustomersPage";
import VehicleAdd from "./components/pages/vehicles/VehicleAdd";
import VehicleEdit from "./components/pages/vehicles/VehicleEdit";
import VehicleDelete from "./components/pages/vehicles/VehicleDelete";
import VehicleView from "./components/pages/vehicles/VehicleView";
import CustomerAdd from "./components/pages/customers/CustomerAdd";
import CustomerView from "./components/pages/customers/CustomerView";
import CustomerEdit from "./components/pages/customers/CustomerEdit";
import CustomerDelete from "./components/pages/customers/CustomerDelete";
import RentsPage from "./components/pages/RentsPage";

function App() {
    return (
        <div className="container">
            <Switch>
                <Navigationbar/>
            </Switch>

            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route exact path='/vehicles' component={VehiclesPage}/>
                <Route exact path='/vehicles/add' component={VehicleAdd}/>
                <Route exact path='/vehicles/edit/:id' component={VehicleEdit}/>
                <Route exact path='/vehicles/delete/:id' component={VehicleDelete}/>
                <Route exact path='/vehicles/view/:id' component={VehicleView}/>
                <Route exact path='/customers' component={CustomersPage}/>
                <Route exact path='/customers/add' component={CustomerAdd}/>
                <Route exact path='/customers/view/:id' component={CustomerView}/>
                <Route exact path='/customers/edit/:id' component={CustomerEdit}/>
                <Route exact path='/customers/delete/:id' component={CustomerDelete}/>
                <Route exact path='/rent' component={RentPage}/>
                <Route exact path='/rents' component={RentsPage}/>
            </Switch>
        </div>);
}

export default App;
