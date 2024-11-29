// src/pages/upload.js
import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase"; // Ensure correct import

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

        // Reset error and set loading state
        setError("");
        setLoading(true);
        try {
            // Create a reference to the file in Firebase Storage
            const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
            // Upload the file
            await uploadBytes(storageRef, file);
            // Get the download URL
            const url = await getDownloadURL(storageRef);
            // Set the download URL state
            setDownloadURL(url);
            // Reset the file input
            setFile(null);
        } catch (e) {
            console.error("Upload error:", e);
            setError("File upload failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Upload App</h2>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload} disabled={loading}>
                {loading ? "Uploading..." : "Upload"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {downloadURL && (
                <div>
                    <p>File uploaded successfully!</p>
                    <a href={downloadURL} download>
                        Download File
                    </a>
                </div>
            )}
        </div>
    );
}

export default Upload;