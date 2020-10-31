import React, {useEffect, useState} from 'react';
import {projectFirestore} from "../../../firebase/config";
import {useCollectionData} from "react-firebase-hooks/firestore";
import ImageDisplay from "../../shared/ImageDisplay";
import {FirebaseTimestampToYear} from "../../../utils/DateUtils";
import VehicleFuelTypes from "../../../types/VehicleFuelTypes";

const VehicleView = (props) => {
    const {match} = props;
    const vehicleId = match.params.id;

    const [vehicleData, setVehicleData] = useState(null);

    // Refs
    const vehiclesRef = projectFirestore.collection('vehicles');

    useEffect(() => {
        vehiclesRef
            .doc(vehicleId)
            .get()
            .then(res => {
                console.log(res.data());
                setVehicleData(res.data());
            });
    }, []);


    if (vehicleData) {
        const {brand, model, year, type, fuelType, price, seatsNumber, picture, count} = vehicleData;
        return (
            <div className="text-center">
                <div className="row">
                    <div className="col-12">
                        <ImageDisplay picture={picture} width="30%"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 text-right">
                        <h2>Brand:</h2>
                    </div>
                    <div className="col-6 text-left">
                        <h2>{brand}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 text-right">
                        <h2>Model:</h2>
                    </div>
                    <div className="col-6 text-left">
                        <h2>{model}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 text-right">
                        <h2>Year:</h2>
                    </div>
                    <div className="col-6 text-left">
                        <h2>{FirebaseTimestampToYear(year)}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 text-right">
                        <h2>Type:</h2>
                    </div>
                    <div className="col-6 text-left">
                        <h2>{type}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 text-right">
                        <h2>Fuel:</h2>
                    </div>
                    <div className="col-6 text-left">
                        <h2>{VehicleFuelTypes[fuelType]}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 text-right">
                        <h2>Seats:</h2>
                    </div>
                    <div className="col-6 text-left">
                        <h2>{seatsNumber}</h2>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6 text-right">
                        <h2>Rent price:</h2>
                    </div>
                    <div className="col-6 text-left">
                        <h2>{price}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 text-right">
                        <h2>Vehicles available:</h2>
                    </div>
                    <div className="col-6 text-left">
                        <h2>{count}</h2>
                    </div>
                </div>
            </div>
        )
    }
    return (<div className="text-center">Loading...</div>);
};

export default VehicleView;