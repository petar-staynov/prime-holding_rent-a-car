import {useState, useEffect} from 'react';
import {projectStorage} from "../firebase/config";

const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        /* References */
        const storageRef = projectStorage.ref(file.name);

        storageRef.put(file)
            .on('state_changed', (snapshot) => {
                let uploadPercentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(uploadPercentage);
            }, (err) => {
                setError(err);
            }, async () => {
                const fileUrl = await storageRef.getDownloadURL();
                setUrl(fileUrl);
            });
    }, [file]);

    return {progress, url, error};
};

export default useStorage;