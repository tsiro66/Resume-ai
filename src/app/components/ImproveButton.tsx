// ProcessButton Component
const ImproveButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 rounded-lg py-3 px-4 text-xl mt-4 text-gray-100
         hover:bg-blue-600 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer shadow-md w-full"
    >
      Improve My CV with Gemini AI
    </button>
  );
};

export default ImproveButton;
