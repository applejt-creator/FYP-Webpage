//src/pages/Download.js
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
        // More file types can be added here
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Download Files</h2>
            {loading && <div style={styles.spinner}>Loading...</div>}
            {error && <p style={styles.error}>{error}</p>}
            {files.length === 0 && !loading && <p>No files available for download.</p>}
            <ul style={styles.fileList}>
                {files.map((file) => (
                    <li key={file.name} style={styles.fileItem}>
                        <span style={styles.icon}>
                            {fileTypeIcons[file.name.split('.').pop().toLowerCase()] || '📁'}
                        </span>
                        <a href={file.url} download style={styles.link}>
                            {file.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        textAlign: 'center',
        color: '#333',
    },
    spinner: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#777',
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
    fileList: {
        listStyle: 'none',
        padding: 0,
    },
    fileItem: {
        marginBottom: '10px',
        padding: '10px',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        marginRight: '10px',
        fontSize: '20px',
    },
    link: {
        textDecoration: 'none',
        color: '#007BFF',
        fontWeight: 'bold',
    },
};

export default Download;
