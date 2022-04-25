const express = require('express')
const morgan = require('morgan')
const bp = require('body-parser')

const { urlencoded, json } = bp

const db = []

var id = 0

const app = express()

app.use(urlencoded({ extended: true }))
app.use(json())
app.use(morgan('dev'))
app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})



app.get('/todo', (req, res) => {
  res.json({ db })
})

app.get('/addTodo/:text', (req, res) => {
  const newTodo = { complete: false, id: id++, text: req.params.text, Date: new Date() }
  db.push(newTodo)
  res.json({ newTodo })
})

app.post('/todo', (req, res) => {
  const newTodo = { complete: false, id: id++, text: req.body.text, Date: new Date()  }
  db.push(newTodo)

  res.json({ newTodo })
})

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running...`)
})
