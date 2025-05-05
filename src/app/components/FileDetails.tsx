// FileDetails Component
const FileDetails = ({ file }: { file: File }) => {
  return (
    <div className="text-sm rounded-lg text-gray-300 bg-gray-600 mt-4 p-4 shadow-md">
      <h2 className="text-lg font-medium">File Selected:</h2>
      <p>Name: {file.name}</p>
      <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
      <p>Type: {file.type}</p>
    </div>
  );
};

export default FileDetails;
