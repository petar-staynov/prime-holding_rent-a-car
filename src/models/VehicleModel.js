class VehicleModel {
    brand;
    model;
    year;
    type;
    fuelType;
    seats;
    price;
    count;
    picture;

    constructor(brand, model, year, type, fuelType, seats, price, count, picture,) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.type = type;
        this.fuelType = fuelType;
        this.seats = seats;
        this.price = price;
        this.count = count;
        this.picture = picture;
    }
}

export default VehicleModel;