import express from "express";
import cors from "cors";
import {Client, Repository} from "redis-om";
import { userSchema } from "./schema/user.schema.js";

const app = express();
app.use(express.json());
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', "*")
    next();
})
app.use(cors({
    origin: ['http://localhost:3000/']
}));

const client = new Client();
await client.open("redis://bdeweer:fxGC@5103@redis-14199.c242.eu-west-1-2.ec2.cloud.redislabs.com:14199")

const userRepository = new Repository(userSchema, client);
await userRepository.dropIndex();
await userRepository.createIndex();

app.get('/users', async(req,res) => {
    res.send(await userRepository.search().returnAll())
})

app.post('/users', async(req,res) => {
    const user = userRepository.createEntity();

    user.name = req.body.name;
    user.email = req.body.email;
    user.active = false
    user.id = await userRepository.save(user)

    res.send(user)
})



app.listen(8000)