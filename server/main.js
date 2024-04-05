import express from 'express';  
const app = express();

import path, { dirname } from 'path'

const __dirname = path.resolve()

const port = 3000;

app.use(express.static(path.join(__dirname,'./armony/client/main/public')))

app.use('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'./armony/client/main/public','index.html'))
})


app.get('/about',(req,res)=>{
  res.render(path.join(__dirname,'./armony/client/main/public','about.html'))
})

app.use((req,res)=>{
res.status(404).send('<h1>ERROR,404</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});





