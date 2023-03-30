const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// mongodb connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nvo4nkj.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
  try{
    const userCollection=client.db('social_media').collection('users'); // wait ok
    const postCollection=client.db('social_media').collection('posts'); // wait ok

    // users info
    app.post('/users', async(req,res)=>{
      const user=req.body;
    
      const response = await userCollection.insertOne(user);
      res.send(response);
    })

    // all post
    app.post('/posts', async(req,res)=>{
      const post=req.body;
      const response = await postCollection.insertOne(post);
      res.send(response);
    })

    app.get('/posts',async(req,res)=>{
      const query={};
      const result=await postCollection.find(query).toArray();
      res.send(result)
    })
  }
  finally{

  }
}
run().catch(err=>console.log(err))


app.get("/", (req, res) => {
  res.send("Hello  Social Media!");
});

app.listen(port, () => {
  console.log(`social media app listening on port ${port}`);
});
