import React from 'react';

const HomePage = (props) => {
    return (
        <div>
            <h1 className="text-center">Rent a car</h1>
            <p>This is a simple web app built using React (Hooks), Bootstrap
                and Firebase Firestore (DB) and Firebase Storage (Image storage)
            </p>
            <h6>Functionality:</h6>
            <ul>
                <li>[Customers] Read feature</li>
                <li>[Customers] Create feature</li>
                <li>[Customers] Edit feature</li>
                <li>[Customers] Delete feature</li>
                <li>[Vehicles] Read feature (list, browse)</li>
                <li>[Vehicles] Create feature</li>
                <li>[Vehicles] Update feature</li>
                <li>[Vehicles] Delete feature</li>
                <li>Rent a car feature - update number of available vehicles</li>
                <li>Rent a car feature - rental period discounts</li>
                <li>[Rental Events] Read feature (list, browse)</li>
            </ul>
        </div>
    )
};

export default HomePage;