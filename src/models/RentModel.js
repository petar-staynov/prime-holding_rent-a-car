class RentModel {
    startDate;
    endDate;
    customerId;
    vehicleId;
    rentPrice;

    constructor(startDate, endDate, customerId, vehicleId, rentPrice) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.customerId = customerId;
        this.vehicleId = vehicleId;
        this.rentPrice = rentPrice;
    }
}

export default RentModel;