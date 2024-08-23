export class TokenBucket {
    private capacity: number;
    private tokens: number;
    private refillRate: number;
    private lastRefillTime = Date.now();


    constructor(capacity: number, refillRate: number) {
        this.capacity = capacity;
        this.refillRate = refillRate;
        this.tokens = 0; // we will refill 1 token each sec
    }

    private refillTokens() {
        const now = Date.now();
        const elapsedTime = now - this.lastRefillTime;
        const tokensToAdd = Math.floor(elapsedTime * this.refillRate);
        this.tokens = Math.min(this.capacity, tokensToAdd);
        this.lastRefillTime = now;
    }

    public consumeTokens(): boolean {
        console.log(this.tokens);
        this.refillTokens();
        if(this.tokens > 0)
        {
            this.tokens--;
            return true;
        }
        return false;
    }

    public getTokens() : number {
        this.refillTokens();
        return this.tokens;
    }

}