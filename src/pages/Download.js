//src/pages/Download.js
// import React, { useEffect, useState } from 'react';
// import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

// function Download() {
//     const [files, setFiles] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchFiles = async () => {
//             try {
//                 const storage = getStorage();
//                 const listRef = ref(storage, 'uploads/'); // Reference to the 'uploads' folder
//                 const res = await listAll(listRef);

//                 const filePromises = res.items.map(async (item) => {
//                     const url = await getDownloadURL(item);
//                     return { name: item.name, url };
//                 });

//                 const fileData = await Promise.all(filePromises);
//                 setFiles(fileData);
//             } catch (err) {
//                 console.error(err);
//                 setError('Failed to fetch files. Please try again later.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchFiles();
//     }, []);

//     const fileTypeIcons = {
//         pdf: '📄',
//         jpg: '🖼️',
//         png: '🖼️',
//         mp4: '🎥',
//         zip: '📦',
//         exe: '💾',
//         // More file types can be added here
//     };

//     return (
//         <div style={styles.container}>
//             <h2 style={styles.header}>Download Files</h2>
//             {loading && <div style={styles.spinner}>Loading...</div>}
//             {error && <p style={styles.error}>{error}</p>}
//             {files.length === 0 && !loading && <p>No files available for download.</p>}
//             <ul style={styles.fileList}>
//                 {files.map((file) => (
//                     <li key={file.name} style={styles.fileItem}>
//                         <span style={styles.icon}>
//                             {fileTypeIcons[file.name.split('.').pop().toLowerCase()] || '📁'}
//                         </span>
//                         <a href={file.url} download style={styles.link}>
//                             {file.name}
//                         </a>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// const styles = {
//     container: {
//         padding: '20px',
//         maxWidth: '600px',
//         margin: '0 auto',
//         fontFamily: 'Arial, sans-serif',
//     },
//     header: {
//         textAlign: 'center',
//         color: '#333',
//     },
//     spinner: {
//         textAlign: 'center',
//         fontSize: '18px',
//         color: '#777',
//     },
//     error: {
//         color: 'red',
//         textAlign: 'center',
//     },
//     fileList: {
//         listStyle: 'none',
//         padding: 0,
//     },
//     fileItem: {
//         marginBottom: '10px',
//         padding: '10px',
//         borderBottom: '1px solid #ddd',
//         display: 'flex',
//         alignItems: 'center',
//     },
//     icon: {
//         marginRight: '10px',
//         fontSize: '20px',
//     },
//     link: {
//         textDecoration: 'none',
//         color: '#007BFF',
//         fontWeight: 'bold',
//     },
// };
import React, { useState } from "react";
import { storage } from "../firebase"; // Import your Firebase config
import { ref, listAll, getDownloadURL } from "firebase/storage";

const Download = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch file list from Firebase Storage
  const fetchFiles = async () => {
    setLoading(true);
    const storageRef = ref(storage, `gs://fpy-24-s4-01.firebasestorage.app/uploads/`); // Path to your folder in Firebase Storage
    try {
      const res = await listAll(storageRef);
      const filesWithUrls = await Promise.all(
        res.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return { name: item.name, url };
        })
      );
      setFiles(filesWithUrls);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
    setLoading(false);
  };

  // Trigger download
  const handleDownload = (url, name) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <style>
        {`
/* Centering Content in the Container */
.container {
  padding: 20px;
  max-width: 800px;
  margin: 20px auto;
  background: rgba(15, 15, 15, 0.95); /* Dark background */
  border-radius: 15px;
  border: 2px solid rgba(255, 0, 0, 0.4); /* Soft neon red border */
  box-shadow: 0 4px 20px rgba(255, 0, 0, 0.8); /* Stronger red glow */
  font-family: 'Orbitron', sans-serif; /* Gaming font */
  color: #fff;
  text-align: center; /* Center text */
}

/* Header Styling */
.container h2 {
  text-align: center;
  color: #ff1e1e; /* Neon red */
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 15px rgba(255, 30, 30, 1); /* Strong neon glow */
}

/* Button Styling */
button {
  display: inline-block;
  background: linear-gradient(90deg, #ff0000, #990000); /* Red gradient */
  color: #fff;
  border: none;
  padding: 12px 24px;
  margin: 0 auto;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(255, 0, 0, 0.9); /* Neon red glow */
}

button:hover {
  background: linear-gradient(90deg, #990000, #ff0000); /* Inverse red gradient */
  box-shadow: 0 6px 18px rgba(255, 0, 0, 1); /* Stronger glow */
  transform: translateY(-3px);
}

button:disabled {
  background: rgba(100, 0, 0, 0.6);
  cursor: not-allowed;
  box-shadow: none;
}

/* Center Align Header and Button */
.container h2,
button {
  margin-left: auto;
  margin-right: auto;
}

/* File List Styling */
ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(40, 10, 10, 0.9); /* Dark red */
  margin: 0.5rem 0;
  padding: 0.8rem 1rem;
  border-radius: 10px;
  box-shadow: inset 0 0 15px rgba(255, 0, 0, 0.4), 0 4px 15px rgba(255, 0, 0, 0.6); /* Inner and outer glowing */
}

li span {
  font-size: 1rem;
  color: #ff6666; /* Neon light red */
  font-weight: bold;
  text-transform: uppercase;
}

/* File Download Button */
li button {
  padding: 10px 18px;
  font-size: 0.9rem;
  font-weight: bold;
  background: linear-gradient(90deg, #ff4d4d, #cc0000); /* Gradient red */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
}

li button:hover {
  background: linear-gradient(90deg, #cc0000, #ff4d4d); /* Inverse gradient */
  box-shadow: 0 4px 12px rgba(255, 77, 77, 1); /* Neon red glow */
  transform: scale(1.05);
}

/* Error Message Styling */
.error {
  color: #ff3333; /* Bright neon red */
  text-align: center;
  font-size: 1.4rem;
  font-weight: bold;
  text-shadow: 0 2px 5px rgba(255, 51, 51, 0.9); /* Glowing effect */
}

/* Spinner Styling */
.spinner {
  text-align: center;
  font-size: 2rem;
  color: #ff6666; /* Light neon red */
  animation: spin 1s linear infinite;
  text-shadow: 0 2px 5px rgba(255, 102, 102, 1); /* Glowing effect */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}


       `}
      </style>
      <div>
        <h2>Download Files</h2>
        <button onClick={fetchFiles} disabled={loading}>
          {loading ? "Loading..." : "Fetch Files"}
        </button>
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <span>{file.name}</span>
              <button onClick={() => handleDownload(file.url, file.name)}>
                Download
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Download;
