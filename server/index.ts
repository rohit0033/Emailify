// import express, { Request, Response } from 'express';
// import dotenv from 'dotenv';
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
// import cors from 'cors';
// import gmail from "./GmailApi";
// dotenv.config();
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import gmail from './GmailApi';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import cors from 'cors';

dotenv.config();





const generateJsonFromTextfromOpenAI = async (maildata: string,openAiKey: string): Promise<string> => {
    const model = new ChatOpenAI({
        modelName: "gpt-4o",
        openAIApiKey: openAiKey,
        temperature: 0.9,
      });
  try {
    const prompt = ChatPromptTemplate.fromTemplate(
      "Look at the following number of emails data:\n" +
      maildata +
      "\nConvert the data into JSON format, provide only the JSON information about each email with topic, full body(the relevant content only), category (important, spam, advertisement)."
    );
    const outputParser = new StringOutputParser();
    const chain = prompt.pipe(model).pipe(outputParser);
    const result = await chain.invoke({});
  

    const firstIndex = result.indexOf("{");
    const jsonStringEnd = result.lastIndexOf("}") + 1;
    const extractedData = result.substring(firstIndex, jsonStringEnd);
    console.log("Extracted data: ", extractedData);

    return extractedData;
  } catch (error) {
    console.error("Error generating JSON from text:", error);
    throw error;
  }
};






const app = express();
app.use(cors());
const port = process.env.PORT || 3000;


async function generateJsonFromTextGemini(maildata: string,GeminiAiKey: string): Promise<string> {
const gemini = GeminiAiKey;
const genAi = new GoogleGenerativeAI(gemini);
    
const model = genAi.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
  try {
    const promptText = 
    "Look at the following number of emails data:\n" +
    maildata +
    "\nConvert the data into JSON format, provide only the JSON information about each email with topic, full body(200 characters only), category (important, spam, advertisement)."
    const result = await model.generateContent(promptText);

    const jsonData = result.response.text();
    const firstIndex = jsonData.indexOf("{");
    const jsonStringEnd = jsonData.lastIndexOf("}") + 1;
    const extractedData = jsonData.substring(firstIndex, jsonStringEnd);

    return extractedData;
  } catch (error) {
    console.error("Error generating content:", error);
    return "";
  }
}

app.get('/extract-emails', async (req: Request, res: Response) => {
    const AiKey = req.query.openAiKey as string;
    const numEmails = req.query.numEmails as string; // Extract OpenAI key and number of emails from query params
    if (!AiKey || !numEmails) {
      return res.status(400).send('AI API key and number of emails are required');
    }
  
    try {
      const mailData = await gmail.readAllInboxContent("to:therohitsharma2004@gmail.com", Number(numEmails));
      const extractedData = await generateJsonFromTextfromOpenAI(mailData,AiKey);
      res.send(extractedData);
    } catch (error) {
      console.error("Error extracting emails:", error);
      res.status(500).send("Error extracting emails");
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
