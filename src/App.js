import React from 'react';
import logo from './logo.svg';
import {Counter} from './features/counter/Counter';
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
                <Route exact path='/vehicles/edit' component={VehicleEdit}/>
                <Route exact path='/vehicles/delete' component={VehicleDelete}/>
                <Route exact path='/vehicles/view/:id' component={VehicleView}/>
                <Route exact path='/customers' component={CustomersPage}/>
                <Route exact path='/rent' component={RentPage}/>

            </Switch>
        </div>);
}

export default App;
