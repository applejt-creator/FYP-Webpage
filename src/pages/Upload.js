// src/pages/Upload.js
import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Upload() {
    const [file, setFile] = useState(null);
    const [downloadURL, setDownloadURL] = useState('');

    const handleUpload = async () => {
        const storage = getStorage();
        const storageRef = ref(storage, `uploads/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setDownloadURL(url);
    };

    return (
        <div>
            <h2>Upload App</h2>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>
            {downloadURL && (
                <div>
                    <p>File uploaded successfully!</p>
                    <a href={downloadURL} download>Download File</a>
                </div>
            )}
        </div>
    );
}

export default Upload;
