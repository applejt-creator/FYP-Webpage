// src/pages/Upload.js
import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

function Upload() {
    const [file, setFile] = useState(null);
    const [downloadURL, setDownloadURL] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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
        } catch (e) {
            console.error("Upload error:", e);
            setError("File upload failed. Please check your Firebase setup and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Upload File</h2>
            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                accept="*/*"  // Allows all file types
            />
            <button onClick={handleUpload} disabled={loading}>
                {loading ? "Uploading..." : "Upload"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {downloadURL && (
                <div>
                    <p>File uploaded successfully!</p>
                    <a href={downloadURL} target="_blank" rel="noopener noreferrer">
                        Download File
                    </a>
                </div>
            )}
        </div>
    );
}

export default Upload;
