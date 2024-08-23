import express from 'express';
import { TokenBucket } from './tokenBucket'; // Import the TokenBucket class
const app = express();

const PORT = process.env.PORT || 3002;

const bucket = new TokenBucket(1, 1/100); // 10 tokens max with 1 token per second

app.get('/', (req,res) => {
    res.send('Hello there!!');
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT number: ${PORT}`);
});



app.get('/unlimited', (req, res) => {
    res.send("Unlimited calls possible... woohooo...!!")
});

// Token bucket algorithm
// implement this strategy such that the bucket is per IP address, has a capacity of 10 tokens with new tokens added at a rate of 1 token per second.

app.get('/limited', (req, res) => {

    if(bucket.consumeTokens()==true) {
        res.send("Limited calls possible with this endpoint.");
    }
    else res.status(429).send("Too many requests");
    
    
});