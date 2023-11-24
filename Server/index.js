const express = require('express');
const conectarBD = require('./config/db')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

const app = express();
const PORT = 4001;

conectarBD();

app.use(express.json())
app.use(cors({
    origin :"http://localhost:5173",
    credentials: true
  }));

app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api',require('./routes/productosRoutes'));
app.use('/api',require('./routes/carritoRoutes'))

app.use('/api',require('./routes/usuarioRoutes'))

app.use('/api',require('./routes/compraRoutes'))
app.use('/api', require('./routes/payment.routes'))
app.use('/api', require('./routes/pedidos.routes'))

app.use('/uploads', express.static('uploads'));




app.listen(PORT,()=>{
    console.log("Server corriendo en puerto 4001")
})
