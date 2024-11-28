// src/pages/Upload.js
import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Upload() {
    const [file, setFile] = useState(null);
    const [downloadURL, setDownloadURL] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file before uploading.');
            return;
        }

        // Optionally, add file type validation here
        const acceptedFileTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Example types
        if (!acceptedFileTypes.includes(file.type)) {
            setError('File type not supported. Please upload a JPEG, PNG, or PDF.');
            return;
        }

        setError('');
        setLoading(true); // Set loading state to true
        try {
            const storage = getStorage();
            const storageRef = ref(storage, `uploads/${file.name}`);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            setDownloadURL(url);
            setFile(null); // Reset the file input
        } catch (e) {
            setError('File upload failed. Please try again.');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div>
            <h2>Upload App</h2>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload} disabled={loading}>
                {loading ? 'Uploading...' : 'Upload'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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