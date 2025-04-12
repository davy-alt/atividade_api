
import express from 'express' 
import { v4 as uuidv4 } from 'uuid';



const app = express()
app.use(express.json())
const PORT = 3333

    //TODO-LIST
    // [X] - Listar todas as pessoas cadastradas
    // [X] - Cadastrar uma unica pessoa
    // [X] - Buscar uma unica pessoa
    // [X] - Atualizar uma unica pessoa
    // [] - Deletar uma unica pessoa

const pessoas = []


//Buscar pessoas cadastradas
app.get('/pessoas', (request, response) => {
    response.status(200).json(pessoas)
})

//cadastrar uma pessoa
app.post('/pessoas', (request, response) => {
    const {nome, cargo} = request.body

    if(!nome){
        response.status(400).json({menssagem: "Nome é obrigatório"}) 
        return
    }

    if(!cargo){
        response.status(400).json({menssagem: "Cargo é obrigatório"})
        return
    }

    const pessoa = {
        id: uuidv4(),
        nome,
        cargo
    }

    pessoas.push(pessoa)//adiciona um item no array "pessoas"
    response.status(201).json({menssagem: 'Cadastro realizado com sucesso', pessoa})
})

//Buscar uma única pessoa
app.get('/pessoas/:id', (request, response) => {
    const { id } = request.params

    /**
     *  {id:19, nome: "davy", cargo:"web developer"}
     *  {id:20, nome: "davy", cargo:"web developer"}
     */

    const encontrarPessoa = pessoas.findIndex((obj) => obj.id === id)
    if(encontrarPessoa === -1){
        response.status(404).json({menssagem: 'Pessoa não encontrada.'})
        return
    }
    //mostrar a pessoa procurada
    const pessoa = pessoas [encontrarPessoa]

    response.status(200).json({rota: 'Pessoa encontrada', pessoa})
})

//Atualizar uma única pessoa
app.put('/pessoas/:id', (request, response) => {
    const { id } = request.params
    const {nome, cargo} = request.body

    const encontrarPessoa = pessoas.findIndex((obj) => obj.id === id)
    if(encontrarPessoa === -1){
        response.status(404).json({menssagem: 'Pessoa não encontrada.'})
        return
    }

    if(!cargo || !nome){
        response.status(400).json({messagem: 'Nome e cargo é obrigatorio'})
        return
    }

    const pessoaAtualizada = {
        id,
        nome,
        cargo
    }

    pessoas[encontrarPessoa] = pessoaAtualizada

    response.status(200).json({rota: 'Pessoa Atualizada', pessoaAtualizada})
    
})

//deletar uma única pessoa
app.delete('/pessoas/:id', (request, response) => {
    const { id } = request.params

    
    const encontrarPessoa = pessoas.findIndex((obj) => obj.id === id)
    if(encontrarPessoa === -1){
        response.status(404).json({menssagem: 'Pessoa não encontrada.'})
        return
    }
    pessoas.splice(encontrarPessoa, 1)
    response.status(200).json({menssagem:'Pessoa excluida'})
})

app.listen(PORT, () => {
    console.log('Servidor iniciado na porta', PORT)
})