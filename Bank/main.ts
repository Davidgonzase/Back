import express from "express";
import getpetitionstatus from "./resolvers/get/getpepitionstatus.ts";

const app = express();

app.get("/petition",getpetitionstatus);
app.get("/account",);

app.post("/createaccount",);
app.post("/createpetition",);

app.put("/updateaccount")
app.put("/updatepetition")


console.log("Listening at port 8000")
app.listen(8000)