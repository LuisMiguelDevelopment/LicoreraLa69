require('dotenv').config({path:'variables.env'})

module.exports.TOKEN_SECRET = 'secret123';

module.exports.MERCADOPAGO_API_KEY = process.env.MERCADOPAGO_API_KEY

console.log(this.MERCADOPAGO_API_KEY)