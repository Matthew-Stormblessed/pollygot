import express from "express";
import cors from "cors";
import OpenAI from 'openai';
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, 
});

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// 2. Routes
app.post("/api/translate", async (req, res) => {

try{
  console.log("translating...");
  let language = "french";

  if(req.body.language === 1){
    language = "spanish"
  }
  if(req.body.language === 2){
    language = "japanese"
  }


const response = await client.chat.completions.create({
    model: "gpt-5.4-mini",
    messages: [
        {role: "system",
         content: "You are purely a translation ai. Users will input text for what they want translated and you will output only the translation."
        },
        {role: "user",
        content: "translate '" + req.body.text + "' into " + language }]
})

  res.json({
    response: response.choices[0].message.content,
  });
}
catch(e){
    console.error(e);
    throw new Error("Something is wrong")
}
});


app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});