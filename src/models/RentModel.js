class RentModel {
    startDate;
    endDate;
    customerId;
    vehicleId

    constructor(startDate, endDate, customerId, vehicleId) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.customerId = customerId;
        this.vehicleId = vehicleId;
    }
}

export default RentModel;