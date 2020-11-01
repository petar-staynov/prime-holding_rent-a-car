import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {projectFirestore} from "../../../firebase/config";
import {useCollectionData} from "react-firebase-hooks/firestore";
import VehicleFuelTypes from "../../../types/VehicleFuelTypes";
import ImageDisplay from "../../shared/ImageDisplay";
import {FirebaseTimestampToYear} from "../../../utils/DateUtils";

const VehiclesPage = (props) => {
    const [vehiclesData, setVehiclesData] = useState(null);

    // Refs and hooks
    const vehiclesRef = projectFirestore.collection('vehicles');
    const history = useHistory();

    const [vehicles] = useCollectionData(vehiclesRef, {idField: 'id'});

    const handleAddNewVehicle = () => {
        history.push(`/vehicles/add`);
    };

    const TableRow = ({vehicleObj}) => {
        const {id, brand, model, year, type, fuelType, price, seatsNumber, picture, count} = vehicleObj;

        const handleVehicleRowClick = () => {
            history.push(`/vehicles/view/${id}`);
        };

        return (
            <tr onClick={handleVehicleRowClick} style={{cursor: 'pointer'}}>
                <td><ImageDisplay picture={picture} css={{maxHeight: "4rem"}}/></td>
                <td>{brand}</td>
                <td>{model}</td>
                <td>{FirebaseTimestampToYear(year)}</td>
                <td>{type}</td>
                <td>{VehicleFuelTypes[fuelType]}</td>
                <td>{seatsNumber}</td>
                <td>{price}</td>
                <td>{count}</td>
            </tr>
        )
    };

    if (vehicles) {
        return (
            <div>
                <h1 className="text-center">Vehicles</h1>
                <div className="text-center">
                    <button className="btn btn-primary" onClick={handleAddNewVehicle}>Add new vehicle</button>
                </div>
                <hr/>
                <table className="table table-responsive-md">
                    <thead>
                    <tr>
                        <th scope="col">Photo</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Model</th>
                        <th scope="col">Year</th>
                        <th scope="col">Type</th>
                        <th scope="col">Fuel</th>
                        <th scope="col">Seats</th>
                        <th scope="col">$/day</th>
                        <th scope="col">Count</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        vehicles.map((vehicleObj, index) => <TableRow key={index} vehicleObj={vehicleObj}/>)
                    }
                    </tbody>
                </table>
            </div>
        )
    }

    return (<h1 className='text-center'>LOADING...</h1>)
};

export default VehiclesPage;