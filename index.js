
const express =require("express")
const cors=require("cors")
const dotenv=require("dotenv")
dotenv.config() //this will import the hidden keys in .env file
const stripe=require("stripe")(process.env.STRIPE_KEY)


const app=express()
app.use(cors({
    origin:true
}))

app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"success! ",
    })
})



app.post("/payment/create",async(req,res)=>{
    const total=req.query.total;
    if(total>0){
        const paymentintent= await stripe.paymentIntents.create({
            amount:total,
            currency:"usd"
        })
        // console.log("payment recieved",total);
        // res.send(total);

        res.status(201).json({
            clientsecret:paymentintent.client_secret,
        })
    }
    else{
        res.status(400).json({
            message:"failed",
        })
    }
})


app.listen(4000,(error)=>{
    if(error) throw error
    console.log("Amazon server running on the port ","http://127.0.0.1:4000");
})



