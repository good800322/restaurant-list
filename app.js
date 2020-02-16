const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const dataList = require('./restaurant.json')

const port = 3000

//set contemplate engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//include static files
app.use(express.static('public'))

//show the restaurant list
app.get('/', (req, res) => {
  res.render('index', { restaurants: dataList.results })
})

//show details of the specific restaurant
app.get('/restaurants/:id', (req, res) => {
  const restaurant = dataList.results.find(item => item.id.toString() === req.params.id)
  res.render('show', { restaurant: restaurant })
})

//searching
//可以餐廳名稱或種類來搜尋
app.get('/search', (req, res) => {
  const restaurants = dataList.results.filter(item =>
    item.name.toLowerCase().includes(req.query.keyword.toLowerCase()) || item.category.includes(req.query.keyword))
  res.render('index', { restaurants: restaurants, keyword: req.query.keyword })
})

//listen on server
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})