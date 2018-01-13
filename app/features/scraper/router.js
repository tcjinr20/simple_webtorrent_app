const cheerio = require('cheerio');
const request = require('request');

module.exports = (io, socket)=>{
  socket.on('scrape', (data)=>{
    const url = `http://rutor.info/search/0/0/000/0/${data.query}`;
    request(url, (error, res, html)=>{
      if(error) return socket.emit('error', { message: error });
      const $ = cheerio.load(html);
      const tbody = $('#content #index table tbody')[0];
      if(typeof tbody == 'undefined') return socket.emit('files received', 'Files not found.')
      let files = [];
      for(let tr of tbody.children){
        if(tr.attribs.class != 'backgr'){
          let file = {};
          file.title  = tr.children[1].lastChild.children[0].data;
          file.magnet = tr.children[1].children[1].attribs.href;
          file.size   = tr.lastChild.prev.children[0].data;
          file.seeds  = tr.lastChild.children[0].children[1].data;
          file.peers  = tr.lastChild.children[3].children[0].data;
          files.push(file);
        }
      }
      //TODO 
      socket.emit('files received', files)
    })
  })
}
