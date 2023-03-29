const express = require('express')
const app = express()
const cors=require('cors')
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000

// middleware
    app.use(cors());
    app.use(express.json())
    
app.get('/', (req, res) => {
  res.send('Hello  Social Media!')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nvo4nkj.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    const postCollection=client.db('social-media').collection('posts')

    try{

        app.post('/posts',async(req,res)=>{
            const post=req.body;
            const allPost=await postCollection.insertOne(post);
            res.send(allPost)
        })
    }
    finally{

    }

}
run().catch(console.log)

app.listen(port, () => {
  console.log(`social media app listening on port ${port}`)
})