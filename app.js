var app = require('./config/custom-express')();
var faker = require('faker')
var expressLayouts = require('express-ejs-layouts')

app.get('/t', function(request, response){
  // response.send('<h1>Homepage</h1><div>This is homepage.</div>'); // you can also directly write HTML content
  response.sendFile(__dirname + '/views/home.ejs');
});

app.use(expressLayouts)
app.get('/home', function(req,res){
  res.render("home");
});
app.get('', function(req,res){
  res.redirect('/home');});

app.get('/register', function(req,res){
  res.render("pages/register");
});

app.get('/regiterok', function(req,res){
  res.render("pages/registerok");
});
// catch 404 and forward to error handler


app.get('/testAPI', function(req,res){
  res.render("ajaxAPI");
});

app.get('/contact', function(req,res){
  res.render("pages/contact");
});

app.listen(8080, function(){
  console.log('Servidor rodando na porta 8080.');
});

app.get('/about', (req, res) => {


  res.render('pages/about', { testusuarios: users })
})

app.get('/video',function(req,res){
  res.render("pages/player");
});

//souce//////////////////////////////////////////////////////////

app.get('/tutorial', (req, res) => {
  var ref = req.query.ref;
 console.log(ref);
  if(ref==1){
    res.render('pages/tutorial/kendogri1', { testusuarios: users })

  }

if(ref==1){
    res.render('pages/tutorial/kendogri1', { testusuarios: users })

  }

})


 



////////////////////////////////////////////////////////////////
// app.get('/y',function(req,res){
//   res.render("pages/player");
// });

// app.get('/you', function(req,res){

// var names = 0;

// const fs = require('fs');
// const ytdl = require('ytdl-core');
//  var url = 'https://www.youtube.com/watch?v=fez6reiK_Fs'
// //  ytdl(url, { filter: function(format) { return format.container === 'mp4'; } })
// //  .pipe(fs.createWriteStream('vide.mp4'));

// //  ytdl(url, {filter: 'audio'}).pipe(fs.createWriteStream('audioVideo.mp3'));

// // /ytdl(url, { filter: function(format) { return format.container === 'mp4'; } }).pipe(res)
// req=ytdl;
// ytdl(url).pipe(res);

// });


// app.get('/',function(req,res)
// {
// var fs = require('fs');
//   var ytdl = require('ytdl-core');
//   req=ytdl;
// ytdl(Url)
//   .pipe(res.send("player.html"););
// });


var users = [{
  name: faker.name.findName(),
  email: faker.internet.email(),
  avatar: 'http://placekitten.com/300/300'
}, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  avatar: 'http://placekitten.com/400/300'
}, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  avatar: 'http://placekitten.com/500/300'
}]




  
// app.get('/you',function(req,res){

//   let arr = [], vid = ytdl("https://www.youtube.com/watch?v=fez6reiK_Fs");
//   vid.on("data", d => arr.push(d));
//   vid.on("end", () => res.send(arr));
//  })

// ytdl.getInfo(url, {downloadURL: true }, function(err, info) {

//   var readStream = ytdl(url, { filter: function(format) { return format.container === 'mp4'; } });

//   // Check if want to convert to mp3
//   if (ConvertToMp3)
//   {
//           var songinfo = info.title.split(' - ')
//               ffmpeg({source:readStream})
//               .outputOptions('-metadata', 'artist='+songinfo[0])
//               .outputOptions('-metadata', 'title='+songinfo[1])
//               .setFfmpegPath('ffmpeg/bin/ffmpeg.exe')
//               .saveToFile("audio/" + sanitize(info.title) + '.mp3', function(data, err)
//               {
//                   console.log(data);
//               });
//   }
//   else
//   {
//       readStream.pipe(fs.createWriteStream("video/" + sanitize(info.title) + '.mp4'));
//   }
// });