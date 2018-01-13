global.NODE_ENV  = process.env.NODE_ENV || 'development';
const PORT       = process.env.PORT || 3000;
const morgan     = require('morgan');
const path       = require('path');
const express    = require('express');
const app        = express();
const http       = require('http').Server(app);
const io         = require('socket.io')(http);
const { exec }   = require('child_process');

app.use((req, res, next)=> {
  res.setHeader('X-Powered-By', 'someman')
  next()
})

app.get('/fonts*', (req, res)=>{
  res.sendFile(`${__dirname}/node_modules/materialize-css/dist/${req.url}`);
})

app.get('/mejs*', (req, res)=>{
  res.sendFile(`${__dirname}/node_modules/mediaelement/build/${req.url}`)
})

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', (socket)=> {
  require('./app/features/scraper/router')(io, socket)
  require('./app/features/torrent_stream/index')(io, socket)
})

app.get('*', (req, res)=> res.sendFile(`${__dirname}/public/index.html`))

process.on('SIGINT', ()=>{
  console.log('Cleaning webtorrent data...')
  exec('rm -Rf /tmp/webtorrent/*', (error)=>{
    if(error) return console.log(error)
    console.log('Cleanup done successfully!')
    process.exit(1);
  })
});

http.listen(PORT, ()=> console.log(`Express listen on ${PORT} port!`))
