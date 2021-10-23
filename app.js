
//cBy @supra
const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

// Definir o mecanismo de armazenamento
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Upload inicial
const upload = multer({
  storage: storage
}).single('recfile');


// Aplicativo de inicialização
const app = express();

// EJS
app.set('view engine', 'ejs');

// Pasta Pública
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('index'));

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.render('index', {
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('index', {
          msg: 'Erro: Nenhum arquivo selecionado!'
        });
      } else {
        res.json({
          author: '@supra', 
          msg: 'Arquivo enviado!',
          file: `https://nodeuploads.ojanganz.repl.co/uploads/${req.file.filename}`
        });
      }
    }
  });
});

const port = 3000;

app.listen(port, () => console.log(`Servidor iniciado na porta ${port}`));