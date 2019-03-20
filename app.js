var app = require('./config/server');

var server = app.listen(80, function(){
    console.log("Servidor rodando na porta 80");
});

var io  = require('socket.io').listen(server);
app.set('io',io);

io.on('connection',function(socket){
    console.log("conectado")

    socket.on('disconnect',function(){
        console.log('Desconectado');
    })

    socket.on('mesgParaServidor',function(data){

        socket.emit(
            'msgParaCliente',{apelido: data.apelido,msg:data.msg}
        )
        socket.broadcast.emit(
            'msgParaCliente',{apelido: data.apelido,msg:data.msg}
        )
        
        if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
            socket.emit(
                'participantesParaCliente',{apelido: data.apelido}
            )
            socket.broadcast.emit(
                'participantesParaCliente',{apelido: data.apelido}
            )
        }
    })


})