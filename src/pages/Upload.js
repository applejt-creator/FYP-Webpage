// src/pages/Upload.js
import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

function Upload() {
    const [file, setFile] = useState(null);
    const [downloadURL, setDownloadURL] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [fileInfo, setFileInfo] = useState({ name: "", size: "" });

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Validate file type if needed (e.g., only images or PDFs)
            const validTypes = ["image/jpeg", "image/png", "application/pdf"];
            if (!validTypes.includes(selectedFile.type)) {
                setError("Unsupported file type. Please upload a JPG, PNG, or PDF.");
                setFile(null);
                return;
            }

            // Set file and its details
            setError("");
            setFile(selectedFile);
            setFileInfo({
                name: selectedFile.name,
                size: (selectedFile.size / 1024).toFixed(2) + " KB",
            });
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Please select a file before uploading.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            // Create a storage reference
            const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);

            // Upload the file
            const snapshot = await uploadBytes(storageRef, file);

            // Retrieve the download URL
            const url = await getDownloadURL(snapshot.ref);

            setDownloadURL(url);
            console.log("File uploaded successfully:", url);
            setFile(null);
            setFileInfo({ name: "", size: "" });
        } catch (e) {
            console.error("Upload error:", e);
            setError("File upload failed. Please check your Firebase setup and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Upload File</h2>
            <input
                type="file"
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png,.pdf" // Restrict file types to specific ones
                style={styles.fileInput}
            />
            {file && (
                <p>
                    <strong>Selected File:</strong> {fileInfo.name} ({fileInfo.size})
                </p>
            )}
            <button onClick={handleUpload} disabled={loading} style={styles.uploadButton}>
                {loading ? "Uploading..." : "Upload"}
            </button>
            {error && <p style={styles.error}>{error}</p>}
            {downloadURL && (
                <div style={styles.success}>
                    <p>File uploaded successfully!</p>
                    <a href={downloadURL} target="_blank" rel="noopener noreferrer">
                        Download File
                    </a>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        maxWidth: '400px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        textAlign: 'center',
        color: '#333',
    },
    fileInput: {
        display: 'block',
        margin: '10px 0',
    },
    uploadButton: {
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
        borderRadius: '5px',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    },
    success: {
        marginTop: '20px',
        color: 'green',
    },
};

export default Upload;
