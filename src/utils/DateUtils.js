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