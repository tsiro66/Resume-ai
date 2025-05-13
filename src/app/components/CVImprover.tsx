"use client";
import { useState } from "react";
import BackButton from "./Buttons/BackButton";
import FileSelector from "./FileSelector";
import ErrorDisplay from "./ErrorDisplay";
import FileDetails from "./FileDetails";
import ImproveButton from "./Buttons/ImproveButton";
import ProgressIndicator from "./ProgressIndicator";
import ResultViewer from "./ResultViewer";

// Types
type AiStatus = "idle" | "processing" | "success" | "error";

const CVImprover = () => {
  const [file, setFile] = useState<File | null>(null);
  const [aiStatus, setAiStatus] = useState<AiStatus>("idle");
  const [modifiedCv, setModifiedCv] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const handleFileChange = (newFile: File | null) => {
    setFile(newFile);
    setErrorMessage(null);
  };

  const handleProcessCv = async () => {
    if (!file) {
      setErrorMessage("Please upload a PDF file first.");
      return;
    }

    setAiStatus("processing");
    setModifiedCv(null);
    setErrorMessage(null);
    setProgress(0);

    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + Math.random() * 10;
        return newProgress > 95 ? 95 : newProgress;
      });
    }, 500);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("api/process-cv", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        // First check if response is HTML (common with 500 errors from Next.js)
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("text/html")) {
          console.error("Server returned HTML error page");
          throw new Error(
            `Server returned ${response.status} ${response.statusText}. Check server logs for details.`
          );
        }

        // Try to parse as JSON
        let errorData;
        try {
          errorData = await response.json();
        } catch (jsonError) {
          // If response isn't valid JSON, create a generic error message
          console.error("Failed to parse error response:", jsonError);
          throw new Error(
            `Server returned ${response.status} ${response.statusText}. Check server logs for details.`
          );
        }

        setErrorMessage(
          errorData?.error || "Failed to process CV with Gemini AI."
        );
        setAiStatus("error");
        return;
      }

      let data;

      try {
        const responseText = await response.text();
        // Check if the response is empty
        if (!responseText || responseText.trim() === "") {
          throw new Error("Empty response received from server");
        }

        // Safely try to parse as JSON
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error("Failed to parse response as JSON:", parseError);
          console.log(
            "Response content:",
            responseText.substring(0, 200) + "..."
          );
          throw new Error("Invalid JSON response from server");
        }
      } catch (textError) {
        console.error("Failed to read response:", textError);
        throw new Error("Failed to read response from server");
      }

      if (data?.modifiedCvText) {
        setModifiedCv(data.modifiedCvText);
        setAiStatus("success");
      } else {
        setErrorMessage("No modified CV text received from Gemini AI.");
        setAiStatus("error");
      }
    } catch (error: unknown) {
      clearInterval(progressInterval);
      console.error("CV processing error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while processing your CV.";
      setErrorMessage(errorMessage);
      setAiStatus("error");
    }
  };

  const handleDownload = () => {
    if (modifiedCv) {
      const blob = new Blob([modifiedCv], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "improved_cv.txt";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } else {
      setErrorMessage("No improved CV available to download.");
    }
  };

  const resetState = () => {
    setFile(null);
    setAiStatus("idle");
    setModifiedCv(null);
    setErrorMessage(null);
    setProgress(0);
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-gray-800 p-4'>
      <div className='bg-gray-700 rounded-xl p-8 max-w-1/2 w-full shadow-xl'>
        <h1 className='text-gray-100 text-center text-4xl font-bold mb-6'>
          CV Improver AI
        </h1>

        {aiStatus === "success" && <BackButton onClick={resetState} />}

        <p className='text-gray-300 mb-6 text-center'>
          Upload your CV and let Gemini AI enhance it with better wording,
          formatting, and impact
        </p>

        <FileSelector onFileChange={handleFileChange} currentFile={file} />

        {errorMessage && (
          <ErrorDisplay message={errorMessage} onRetry={resetState} />
        )}

        {file && !errorMessage && <FileDetails file={file} />}

        {file && !errorMessage && aiStatus === "idle" && (
          <ImproveButton onClick={handleProcessCv} />
        )}

        {aiStatus === "processing" && <ProgressIndicator progress={progress} />}

        {aiStatus === "success" && modifiedCv && (
          <ResultViewer modifiedCv={modifiedCv} onDownload={handleDownload} />
        )}
      </div>
    </div>
  );
};

export default CVImprover;
