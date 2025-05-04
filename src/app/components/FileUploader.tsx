"use client";
import { useState, useRef } from "react";

type UploadStatus = "idle" | "uploading" | "success" | "error";

const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setStatus("uploading");

    try {
      const formData = new FormData();
      formData.append("file", file);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-800 p-4">
      <div className=" rounded-lg p-6 max-w-md w-full">
        <label className="text-gray-100 block mb-5 text-center text-4xl font-medium">
          Upload your CV
        </label>

        {/* Hidden actual file input */}
        <input
          ref={fileInputRef}
          className="hidden"
          id="file_input"
          type="file"
          onChange={handleFileChange}
        />

        {/* Custom file input button */}
        <div
          onClick={triggerFileInput}
          className="block w-full text-center text-xl text-gray-800 bg-yellow-400 
           hover:bg-yellow-500 hover:scale-105 mt-4 rounded-4xl p-2 cursor-pointer transition-all duration-300 ease-in-out shadow-md"
        >
          Choose File
        </div>

        {file && (
          <div
            className="text-sm rounded-2xl
           text-gray-400 bg-gray-700 border-gray-600 placeholder-gray-400 mt-4 p-4 shadow-md"
          >
            <h2 className="text-lg font-medium">File Details:</h2>
            <p>Name: {file.name}</p>
            <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
            <p>Type: {file.type}</p>
          </div>
        )}

        {file && status !== "uploading" && (
          <button
            onClick={handleUpload}
            className="bg-yellow-400 rounded-4xl py-2 px-4 text-xl mt-4 text-gray-800
           hover:bg-yellow-500 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer shadow-md w-full"
          >
            Upload
          </button>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
