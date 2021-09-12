const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const CadAbrigo = require('./schemasabrig/cadabrigo')
const DataeHora = require('./schemasabrig/data')
const data = require('./schemasabrig/data')
const cadagend = require('./schemaagend/cadagend')
const horariosagenda = require('./schemaagend/horariosagenda')
require('dotenv').config()


const conectarAoBancoDeDados = async () => {
    const Cadastro = process.env.MONGODB_DATABASE_NAME
    const usuarioMongo = process.env.MONGODB_USER
    const senhaMongo = process.env.MONGODB_PASSWORD
    await mongoose.connect(`mongodb+srv://${usuarioMongo}:${senhaMongo}@cluster0.eu69u.mongodb.net/${Cadastro}?retryWrites=true&w=majority`)
}

const bootstrap = async () => {

    await conectarAoBancoDeDados()

    const app = express()

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
        app.get('/cadabrigo', async (request, response) => {
            const entidades = await CadAbrigo.find()

            
            return response.render(entidades)
        })

    app.post('/cadabrigo', async (request, response) => {
        const { nome, endereco, cel, mail, obs } = request.body

        const entidade = new CadAbrigo({nome, endereco, cel, mail, obs})
        await entidade.save()

        const emailExiste = await CadAbrigo.findOne({mail}) 
        if (emailExiste) {
            return response.redirect('/cadabrigo')
        }
        const celExiste = await CadAbrigo.findOne({cel})
        if (celExiste) {
            return response.redirect('/cadabrigo')
        }

        return response.redirect('/cadabrigo')
    })
    
        app.get('/datas', async (request, response) => {
        const datas = await data.find()
        return response.render('datas.ejs', {datas})

    })

        app.get('/datas/novo', async (request, response) => {
             return response.render('novas-datas.ejs')

    })

    app.post('/datas', async (request, response) => {
        const { diautil, fds, hora} = request.body

        const dataehora = new DataeHora({ diautil, fds, hora})
        
        await dataehora.save()

        return response.redirect('/datas')
    })





    app.get('/cadvisita', async (request, response) => {
        const entidades = await cadagend.find()

        
        return response.render(entidades)

    })

    app.post('/cadastrovisitas', async (request, response) => {
        const { nome, cel, email, instituicao} = request.body

        
        const entidade = new cadagend({nome, cel, email, instituicao })
        await entidade.save()

        return response.redirect('/cadagendacompleto')
    })

    app.get('/escolhadedatas', async (request, response) => {
        const escolhadedatas = await horariosagenda.find()
        return response.render('datas.ejs', {escolhadedatas})

    })

    app.post('/agendamentodedatas', async (request, response) => {
        const { diavisita, horavisita} = request.body

        
        const entidade = new horariosagenda({diavisita, horavisita })
        await entidade.save()

        return response.redirect('/agendamentodedatas')
    })






    app.listen(9444, () => {
        console.log('Site rodando em http://localhost:9444')
    })
}

bootstrap()