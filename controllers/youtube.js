// app.get('/you', function(req,res){
var path = require('path');
var fs = require('fs');
var ytdl = require('ytdl-core');
const urlLib = require('url');
const https = require('https');
module.exports = function (app) {
    var o = "";
    var porcentagem = "";
    app.post('/you', function (req, res, next) {




        // var url = 'https://www.youtube.com/watch?v=fez6reiK_Fs'

        // var path = require('path');
        // var fs = require('fs');
        // var ytdl = require('ytdl-core');

        // var output = path.resolve(__dirname + "/../public/videos", 'videos.mp4');

        // var video = ytdl(url);
        // video.pipe(fs.createWriteStream(output));
        // video.on('response', function (res) {
        //     var totalSize = res.headers['content-length'];
        //     var dataRead = 0;


        //     res.on('data', function (data) {
        //         dataRead += data.length;
        //         var percent = dataRead / totalSize;
        //         process.stdout.cursorTo(0);
        //         process.stdout.clearLine(1);
        //         process.stdout.write((percent * 100).toFixed(0));





        //     });



        //     res.on('end', function () {

        //         process.stdout.write('\n');
        //         pronto();

        //     });
        // });


        // function pronto() {
        //       res.send('ok');
        // //      setTimeout(() => {
        // //         fs.unlinkSync(output);
        // //     }, 20000);
        // // }
        // }
        // function carregando(data) {

        //     res.send(data);
        // }







    });
    var tamanho = [];


    app.post('/videod', async function (req, res) {
        tamanho.length = 0;
        var url = req.query.url;
        var qualite = req.query.qualite;
        var type = req.query.type;
        
        if (ytdl.validateURL(url)) {
            var video = ytdl(url, { quality: qualite, filter: type });
            video.pipe(res);
            // ytdl.getInfo(url, function(err, info) {
            //     console.log(info.title) // "Adele - Hello"
            //   });
        } else {
            res.send('url invalida')
        }

    });//END ROTA

    app.post('/consulta', async function (req, res) {
        tamanho.length = 0;
        var url = req.query.url;
        var qualite = req.query.qualite;
        var type = req.query.type;

        
        
        if (ytdl.validateURL(url)) {//valida url
            
            reuestVideo(qualite, type);
        
        } else {
            res.status(400).send('url invalida!');
        }
        function send(r) {
            res.status(200).json(r)
        }

   

        function reuestVideo(qualite, type) {
            var videoH = ytdl(url, { quality: qualite, filter: type });
            videoH.on('info', (info, format) => {
                let str = info.title;
                tamanho.push(str.replace( /\s/g, '_' ));
            var parsed = urlLib.parse(format.url);
            parsed.method = 'HEAD';
            https.request(parsed, (res) => {
            tamanho.push(formatSizeUnits(res.headers['content-length']))
            send(tamanho);            
                 }).end();
            });
        }

    });//END ROTA













    function formatSizeUnits(bytes) {
        if (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
        else if (bytes >= 1048576) { bytes = (bytes / 1048576).toFixed(2) + " MB"; }
        else if (bytes >= 1024) { bytes = (bytes / 1024).toFixed(2) + " KB"; }
        else if (bytes > 1) { bytes = bytes + " bytes"; }
        else if (bytes == 1) { bytes = bytes + " byte"; }
        else { bytes = "0 bytes"; }
        return bytes;
    }





    app.post('/mp3', async function (req, res) {
        var path = require('path');
        var fs = require('fs');
        var ytdl = require('ytdl-core');
        var url = req.query.url;





        if (ytdl.validateURL(url)) {

            console.log('mp3');

            var video = ytdl(url, { quality: 'lowest', filter: 'audio' });
            video.pipe(res);


            // ytdl.getInfo(url, function(err, info) {
            //     console.log(info.title) // "Adele - Hello"
            //   });


        } else {
            res.send('url invalida')

        }
        function dados(f) {
            res.send(f)
        }

    });//END ROTA

};


        // if (ytdl.validateURL(url)) {
        //     console.log('mp4');

        //     var video = ytdl(url, { quality: 'highest', filter: function(format) { return format.container === 'mp4'; } });
        //     video.pipe(res);
        // } else {
        //     res.send('url Invalida')
        // }


        // ytdl.getInfo(url, (err, info) => {
        //     if (err) throw err;
        //     let format = ytdl.chooseFormat(info.formats, { quality: '134' });
        //     if (format) {
        //       console.log('Format found!');
        //       console.log(format);
        //     }
        //   });

        // if (ytdl.validateURL(url)) {//valida url

        //     if (ytdl.validateID(ytdl.getURLVideoID(url))) {//validaid
        //         ytdl.getInfo(url, (err, info) => {
        //             if (err) {
        //                res.status(400).send('This video is unavailable');

        //             } else {
        //                 res.status(201);
        //                 ytdl.getInfo (url)
        //                 ytdl.downloadFromInfo (informações, opções)
        //             }
        //         });
        //     }else{
        //         res.status(400).send('id invalida!');
        //     }

        // } else {
        //     res.status(400).send('url invalida!');

        // }