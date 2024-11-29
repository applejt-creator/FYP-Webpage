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

        // Supported file types
        const acceptedFileTypes = ["image/jpeg", "image/png", "application/pdf", "video/mp4", "application/zip", "application/x-msdownload"];
        const acceptedExtensions = [".jpeg", ".png", ".pdf", ".mp4", ".zip", ".exe"];

        const fileExtension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
        if (!acceptedFileTypes.includes(file.type) && !acceptedExtensions.includes(fileExtension)) {
            setError("File type not supported.");
            return;
        }

        setError("");
        setLoading(true);
        try {
            const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            setDownloadURL(url);
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
