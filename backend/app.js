import express from "express";
import pgPromise from "pg-promise";
import cors from "cors";
import axios from 'axios'
import dotenv from 'dotenv'
const app = express();
const pgp = pgPromise({});

dotenv.config()
const db = pgp(process.env.DB_URL);
console.log("DB connected");
const d = new Date();

app.use(express.json());
app.use(
  cors({
    origin: "https://tu-f-assessment.vercel.app",
    credentials: true,
  })
);

app.get('/',(req,res)=>res.send("Homepage"))

app.get("/snippets", async (req, res) => {
  try {
    const data = await db.manyOrNone(`SELECT * FROM snippets`);
    res.json({ data: data }).status(200);
  } catch (error) {
    res.json({ message: error }).status(500);
  }
});

app.post("/snippets", async (req, res) => {
  const { username, language, stdin, code_snippet } = req.body;
  try {
    await db.oneOrNone(
      `INSERT INTO snippets (username,language,stdin,code_snippet,timestamp) VALUES ($1,$2,$3,$4,$5)`,
      [
        username,
        language,
        stdin,
        code_snippet,
        d.toDateString() + " " + d.toLocaleTimeString(),
      ]
    );
    res.json({ message: "Operation successful" }).status(201);
  } catch (error) {
    res.json({ message: error }).status(500);
  }
});

app.post('/run-code',async (req,res)=>{
  const {id } = req.body
  console.log("Id",id);
  const snippet = await db.oneOrNone('SELECT * FROM snippets WHERE id = $1', [id]);
  console.log(snippet);

  const options = {
    method: 'POST',
    url: 'https://onecompiler-apis.p.rapidapi.com/api/v1/run',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': process.env.COMPILER_API_KEY,
      'X-RapidAPI-Host': 'onecompiler-apis.p.rapidapi.com'
    },
    data: {
      language: snippet.language.toLowerCase(),
      stdin: snippet.stdin,
      files: [
        {
          name: 'index.js',
          content: snippet.code_snippet
        }
      ]
    }
  };
  
  try {
    const response = await axios.request(options);
    console.log(response.data);
    return res.status(200).json({message:"Submission successful",output:response.data.stdout})
  } catch (error) {
    console.error(error);
  }
})

app.listen(process.env.PORT, () => console.log("Server started at ",process.env.PORT));
