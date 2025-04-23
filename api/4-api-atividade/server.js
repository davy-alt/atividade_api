import express, { response } from 'express'
import cors from 'cors'
import fs from "node:fs"

const PORT = 3333
const url_database = "./database/pessoas.json"

const app = express()
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(express.json())


app.post('/participants', (request, response) => {
    const {name, email, password, idade, city} = request.body

    if(!name || typeof name !== 'string' || name.trim() === ''){
        response.status(400).json({mensagem:"O campo 'name' é obrigatório e deve ser um texto"})
        return
    }

    if (!email || !email.includes('@')) { 
        response.status(400).json({ mensagem: 'Email é obrigatorio' });
        return;
    }
})
app.get()
app.get()
app.put()
app.delete()
app.get()
app.get()
app.get()
app.listen(PORT, ()=>{
    console.log(`Servidor iniciado em  http:())())localhost:3333`)
})