import {EmailPattern, PhoneNumberPattern} from "../regex/RegexPatterns";
import CustomerModel from "../models/CustomerModel";

export const validateVehicle = (vehicleObject) => {
    const {
        brand,
        model,
        year,
        type,
        fuelType,
        seats,
        price,
        count,
    } = vehicleObject;

    if (!brand) {
        return "Please type a brand";
    }
    if (!model) {
        return "Please type a model";
    }
    if (!year) {
        return "Please enter a valid year";
    }
    if (!type) {
        return "Please select a vehicle type";
    }
    if (!fuelType) {
        return "Please select a fuel type";
    }
    if (!seats || seats <= 0) {
        return "Please enter a valid number of seats";
    }
    if (!price || price < 0) {
        return "Please enter a valid price";
    }
    if (!count || count < 0) {
        return "Please enter a valid amount of available vehicles";
    }

    return true;
}

export const validateCustomer = (customerObject) => {
    const {
        name,
        email,
        phone,
    } = customerObject;

    // Form data validation
    const emailRegex = new RegExp(EmailPattern);
    const phoneRegex = new RegExp(PhoneNumberPattern);

    if (!name) {
        return "Please type a valid name";
    }
    if (!email || !emailRegex.test(email)) {
        return "Please type a valid email";
    }
    if (!phone || !phoneRegex.test(phone)) {
        return "Please type a valid phone number of at least 10 digits";
    }

    return true;
}