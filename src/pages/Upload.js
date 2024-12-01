import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase"; // Ensure correct import

function Upload() {
    const [file, setFile] = useState(null);
    const [downloadURL, setDownloadURL] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const validTypes = ["image/jpeg", "image/png", "application/pdf"];
            if (!validTypes.includes(selectedFile.type)) {
                setError("Invalid file type. Please select a JPEG, PNG, or PDF file.");
                setFile(null);
                return;
            }
            if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
                setError("File size exceeds 5MB. Please select a smaller file.");
                setFile(null);
                return;
            }
            setError("");
            setFile(selectedFile);
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
            const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            setDownloadURL(url);
            setFile(null);
        } catch (e) {
            console.error("Upload error:", e);
            if (e.code === "storage/unauthorized") {
                setError("You do not have permission to upload files.");
            } else if (e.code === "storage/quota-exceeded") {
                setError("Storage quota exceeded. Please contact support.");
            } else {
                setError("File upload failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Upload App</h2>
            <input type="file" onChange={handleFileChange} />
            {file && file.type.startsWith("image/") && (
                <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    style={{ width: "150px", marginTop: "10px" }}
                />
            )}
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
