import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// Initialize loosely; we will check for key existence before calling.
const ai = new GoogleGenAI({ apiKey });

export const getGeminiResponse = async (userMessage: string, currentContext: string): Promise<string> => {
  if (!apiKey) {
    return "Error: API Key is missing in the environment variables.";
  }

  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `You are AeroBot, an intelligent assistant for the AeroSense air quality monitoring system. 
    Your goal is to explain air quality metrics (AQI, PM2.5, PM10, VOCs) in simple terms and provide health advice.
    
    Current Context: ${currentContext}
    
    Keep answers concise, helpful, and scientific but accessible. If the AQI is high, suggest precautions like wearing masks or closing windows.
    Do not hallucinate data. Only use the provided context or general scientific knowledge.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: [
        {
          role: 'user',
          parts: [{ text: userMessage }]
        }
      ],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I'm sorry, I couldn't process that.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the knowledge base right now. Please try again later.";
  }
};
