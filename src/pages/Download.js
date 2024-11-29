// src/pages/Download.js
import React, { useEffect, useState } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

function Download() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const storage = getStorage();
                const listRef = ref(storage, 'uploads/'); // Reference to the 'uploads' folder
                const res = await listAll(listRef);
                const filePromises = res.items.map(async (item) => {
                    const url = await getDownloadURL(item);
                    return { name: item.name, url };
                });
                const fileData = await Promise.all(filePromises);
                setFiles(fileData);
            } catch (err) {
                setError('Failed to fetch files. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchFiles();
    }, []);

    return (
        <div>
            <h2>Download Files</h2>
            {loading && <p>Loading files...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {files.length === 0 && !loading && <p>No files available for download.</p>}
            <ul>
                {files.map((file) => (
                    <li key={file.name}>
                        <a href={file.url} download>
                            {file.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Download;