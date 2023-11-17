const express = require('express')
const mongoose = require('mongoose');

const app = express()
const port = 3000

app.use(express.json())

const Filme = mongoose.model('Filme', 
{ title: String,
  description: String,
  imagem_url: String,
  trailer_url: String,
 });


app.get('/', async (req, res) => {
    const filmes = await Filme.find()
  return res.send(filmes)
})

app.put('/:id', async (req, res) => {
    const filmes = await Filme.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        imagem_url: req.body.imagem_url,
        trailer_url: req.body.trailer_url 
    }, {
        new: true
    })
    return res.send(filmes)
})

app.post('/', async(req, res) => {
    const filme = new Filme({
        title: req.body.title,
        description: req.body.description,
        imagem_url: req.body.imagem_url,
        trailer_url: req.body.trailer_url
    })
    await filme.save()
    return res.send(filme)
})

app.delete("/:id", async(req, res) => {
    const filmes = await Filme.findByIdAndDelete(req.params.id)
    return res.send(filmes)
})

app.listen(port, () => {
mongoose.connect('mongodb+srv://Starwars:1K0AWMxhTdVfX1Nt@cluster0.jap58hj.mongodb.net/?retryWrites=true&w=majority');
  console.log(`App rodando`)
})