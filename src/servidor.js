const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cadAbrigo = require('./schemasabrig/cadabrigo')
const cadagend = require('./schemaagend/cadagend')
require('dotenv').config()


const conectarAoBancoDeDados = async () => {
    const Cadastro = process.env.MONGODB_DATABASE_NAME
    const usuarioMongo = process.env.MONGODB_USER
    const senhaMongo = process.env.MONGODB_PASSWORD
    await mongoose.connect(`mongodb+srv://${usuarioMongo}:${senhaMongo}@cluster0.8qo3w.mongodb.net/${Cadastro}?retryWrites=true&w=majority`)
}

const bootstrap = async () => {

    await conectarAoBancoDeDados()

    const app = express()

    app.use(express.static('public'))

    app.use(express.urlencoded({ extended: true }))

    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'ejs')

        app.get('/', (request, response) => {
            return response.render('home/principal.ejs')
        })

        app.get('/cadabrigo', (request, response) => {
            return response.render('home/abrigo.ejs')
        })

        app.get('/cadvisita', (request, response) => {
            return response.render('home/visita.ejs')
        })

        app.get('/sobre', (request, response) => {
            return response.render('home/sobre.ejs')
        })

        app.get('/cadabrigo', async (request, response) => {
            const entidades = await cadAbrigo.find()

            
            return response.render(entidades)
        })

        app.post('/cadabrigo', async (request, response) => {
            const {nome, endereco, cel, mail, obs } = request.body
    
            const entidade = new cadAbrigo({nome, endereco, cel, mail, obs})
            await entidade.save()
    
            let idInstituicao = entidade.get('_id')
    
    
            urlIdInstituicao = '/datas/novo?id='+ idInstituicao
    
            return response.redirect('/datas/novo?id='+ idInstituicao)
        
    })

    app.post('/datas', async (request, response) => {
        const { diautil, fds, hora} = request.body

        const dataehora = new DataeHora({ diautil, fds, hora})
        
        await dataehora.save()

        return response.redirect('/datas')
    })

    app.get('/cadvisitacompleta', async (request, response) => {
        console.log('aqui5')
        const entidades = await cadagend.find()
        console.log('aqui6')
        
        //return response.render(entidades)
        //return response.redirect('/datas')
        return response.render('dadosvisita.ejs', {entidades})

    })

    app.post('/cadastrovisitas', async (request, response) => {
        console.log('aqui1')
        const { nome, cel, email, instituicao, horario } = request.body
        console.log('aqui2')
        const entidade = new cadagend({nome, cel, email, instituicao, horario})
        console.log('aqui3')
        await entidade.save()
        console.log('aqui4')

        return response.redirect('/cadvisitacompleta')
    })

    app.listen(2900, () => {
        console.log('Site rodando em http://localhost:2900')
    })
}

bootstrap()