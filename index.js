const express = require('express')
const app = express()
const routes = require('./routes/api')
const path = require('path')
app.use([express.json(), express.urlencoded({extended:true}) , express.static('./url')])
app.use('/api',routes)
  
// Home Page
app.get('/',async(req,res)=>{
res.sendFile(path.join(__dirname , './url/urlShortener.html'))
})

app.all('*',(req,res)=>{
  res.status(404).send('Oops this page doesn\'t exist')
})

app.listen(5000 , ()=> console.log('listening on port 5000'))


 