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
                console.error(err);
                setError('Failed to fetch files. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchFiles();
    }, []);

    const fileTypeIcons = {
        pdf: '📄',
        jpg: '🖼️',
        png: '🖼️',
        mp4: '🎥',
        zip: '📦',
        exe: '💾',
    };

    return (
        <div>
            <h2>Download Files</h2>
            {loading && <div className="spinner"></div>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {files.length === 0 && !loading && <p>No files available for download.</p>}
            <ul>
                {files.map((file) => (
                    <li key={file.name}>
                        {fileTypeIcons[file.name.split('.').pop().toLowerCase()] || '📁'}
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
