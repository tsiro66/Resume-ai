import { useRef } from "react";

// FileSelector Component
const FileSelector = ({
  onFileChange,
  currentFile,
}: {
  onFileChange: (file: File | null) => void;
  currentFile: File | null;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      if (selectedFile.type === "application/pdf") {
        onFileChange(selectedFile);
      } else {
        onFileChange(null);
        throw new Error("Please upload a PDF file.");
      }
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        className="hidden"
        id="file_input"
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
      />
      <div
        onClick={triggerFileInput}
        className="block w-full text-center text-xl text-gray-800 bg-yellow-400
             hover:bg-yellow-500 hover:scale-105 rounded-lg p-3 cursor-pointer transition-all duration-300 ease-in-out shadow-md"
      >
        {currentFile ? "Change File" : "Choose PDF File"}
      </div>
    </>
  );
};

export default FileSelector;
