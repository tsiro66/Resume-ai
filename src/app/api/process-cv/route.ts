import { GoogleGenerativeAI, Part } from "@google/generative-ai"; // Import Part type
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI("AIzaSyAFqxSfA4vy1oQuNZojB12ZNzWjCO-igpY");

export async function POST(request: NextRequest) {
  try {
    console.log("Value of GEMINI_API_KEY:", process.env.GEMINI_API_KEY);
    console.log("Value of TEST_VAR:", process.env.TEST_VAR);

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Invalid file type. Only PDF is allowed." },
        { status: 400 }
      );
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const base64Data = fileBuffer.toString("base64");

    const cvImprovementPrompt = `
      Analyze the following CV text extracted from a PDF.
      Enhance it by improving wording for clarity and impact, refining the structure/formatting for readability,
      and highlighting key achievements and skills. Focus on action verbs and quantifiable results where possible.
      Ensure the output is professional and suitable for job applications.
      Output *only* the full text of the improved CV.
    `;

    // Define the parts for the single user message directly as an array of Part objects
    const parts: Part[] = [
      { text: cvImprovementPrompt }, // Text part
      {
        // Inline data part (the PDF)
        inlineData: {
          mimeType: file.type,
          data: base64Data,
        },
      },
    ];

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    console.log("Sending request to Gemini API...");

    // Pass the array of parts directly to generateContent
    const result = await model.generateContent(parts);
    // --- CORRECTION END ---

    const geminiResponse = result.response; // Access the response object
    const modifiedCvText = geminiResponse.text(); // Extract the text response

    console.log("Received response from Gemini API.");

    if (!modifiedCvText) {
      console.error("Gemini response was empty.");
      return NextResponse.json(
        { error: "Gemini returned an empty response." },
        { status: 500 }
      );
    }

    return NextResponse.json({ modifiedCvText: modifiedCvText });
  } catch (error: unknown) {
    console.error("Error processing CV:", error);
    let errorMessage = "An unexpected error occurred while processing the CV.";
    if (error instanceof Error) {
      errorMessage = error.message;
      // You might want to check for specific Gemini API errors here too
    }
    return NextResponse.json(
      { error: "Failed to process CV with Gemini AI.", details: errorMessage },
      { status: 500 }
    );
  }
}
