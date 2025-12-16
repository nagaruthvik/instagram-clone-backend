import userData from "../models/userData.js";

import bcrypt from "bcrypt"
import express from "express";

const loginroute = express.Router();

loginroute.get("/", async (req, res) => {
  res.send("hi");
});
loginroute.post("/login", async (req, res) => {
  const { name, password } = req.body;

  const user = await userData.findOne({ name });
  if (user) {
    if(user.name === name && user.password === password){
        return res.status(200).json({message:"login sucessful"})
    }
    else{
        return res.status(400).json({ message: "wrong username or password" });
    }
  } else {
    return res.status(404).json({ message: "user not found" });
  }
});
loginroute.post("/register", async (req, res) => {
  const { name, password } = req.body;

  const user = await userData.findOne({ name });
  if (!user) {
    const hashpassword = await bcrypt.hash(password,Number(process.env.BCRYPT))
    const result = await userData.insertOne({name,password:password})
    if(result){
        res.status(202).json({message:"user created sucessful"})
    }
    
  } else {
    return res.status(404).json({ message: "user already exist" });
  }
});


export default loginroute;
