export type OrderType = { 
    client_id: number, 
    products: { 
        id: number, 
        amount: string 
    }[], 
    amount: number 
}