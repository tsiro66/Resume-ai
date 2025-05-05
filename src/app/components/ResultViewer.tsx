const ResultViewer = ({
  modifiedCv,
  onDownload,
}: {
  modifiedCv: string;
  onDownload: () => void;
}) => {
  return (
    <div className="mt-6 p-4 rounded-lg bg-gray-600 text-gray-100 shadow-md">
      <h2 className="text-xl font-medium mb-3 text-center">
        Improved CV Preview
      </h2>
      <div className="max-h-64 overflow-y-auto bg-gray-700 p-3 rounded-lg mb-4">
        <pre className="whitespace-pre-wrap text-gray-300 text-sm">
          {modifiedCv}
        </pre>
      </div>
      <button
        onClick={onDownload}
        className="bg-green-500 rounded-lg py-3 px-4 text-xl text-gray-100
           hover:bg-green-600 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer shadow-md w-full"
      >
        Download Improved CV
      </button>
    </div>
  );
};

export default ResultViewer;
