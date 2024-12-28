export type UserType = {
    name: string,
    email: string,
    phone: number,
    cpf: number,
}

export type OrderType = { 
    client_id: number, 
    products: { 
        id: number, 
        amount: string 
    }[], 
    amount: number 
}