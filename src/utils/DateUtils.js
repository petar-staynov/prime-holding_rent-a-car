export const FirebaseTimestampToYear = (timestamp) => {
    return new Date(timestamp.toDate()).getFullYear();
}

export const FirebaseTimestampToDate = (timestamp) => {
    return new Date(timestamp.toDate());

}

export const FirebaseTimestampToHtmlDate = (timestamp) => {
    return FirebaseTimestampToDate(timestamp).toISOString().substring(0, 10);
}

export const JsDateToHtmlDate = (date) => {
    return date.toISOString().substring(0, 10);
}

export const CalculateStringDatesDayDifference = (startDate, endDate) => {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    const datesTimeDifference = endDateObj.getTime() - startDateObj.getTime();
    const datesDaysDifference = Math.ceil(datesTimeDifference / (1000 * 3600 * 24));

    return datesDaysDifference;
}

export const CalculateFirebaseTimestampDayDifference = (startDate, endDate) => {
    const startDateObj = FirebaseTimestampToDate(startDate);
    const endDateObj = FirebaseTimestampToDate(endDate);

    const datesTimeDifference = endDateObj.getTime() - startDateObj.getTime();
    const datesDaysDifference = Math.ceil(datesTimeDifference / (1000 * 3600 * 24));

    return datesDaysDifference;
}