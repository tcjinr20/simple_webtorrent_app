//TODO

const EventEmitter = require('events').EventEmitter;

EventEmitter.defaultMaxListeners = 0;

const client =  new require('webtorrent-hybrid')();

client.on('error', (error)=>{
  console.log(error)
})

const fetchFiles = (torrent, emitter)=>{
  let files = [];
  if(!torrent.files.length) return "Can't load torrent";
  for(let index in torrent.files){
    let file = torrent.files[index];
    files.push({
      index: index,
      name: file.name
    })
  }
  console.log('files ', files)
  emitter.emit('data received', files)
}

const getFiles = (magnet, emitter)=>{
  let torrent = client.get(magnet);
  if(!!torrent){
    fetchFiles(torrent, emitter)
  }else{
    client.add(magnet, (torrent)=> fetchFiles(torrent, emitter));
  }
}

module.exports = (io, socket)=>{
  socket.on('getTorrentFiles', (data)=>{
    const emitter = new EventEmitter();
    emitter.on('data received', (res)=>{
      socket.emit('torrentFilesReceived', res)
    })
    getFiles(data.magnet, emitter)
  })
}
