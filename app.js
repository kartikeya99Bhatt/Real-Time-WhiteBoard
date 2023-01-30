const express=require("express"); // accessing the req lib
const socket=require("socket.io"); // acssing the req. lib

const app=express(); // Initia;lize the server

app.use(express.static("public"));

let port =process.env.PORT || 3000;

let server=app.listen(port,()=>{ // data flow with server
 console.log(`The port numner is ${port}`);
});
 
 
let io=socket(server);

io.on("connection",(socket)=>{// it is same as event listener in socket.io labrary
   console.log("connection si made with socket");

   socket.on("beginPath",(data)=>{ // it is also a event listener if it will triget it will go to begin path 
      //data from the frontend 
      io.sockets.emit("beginPath",(data));
   })

   socket.on("drawStroke", (data) => {
      io.sockets.emit("drawStroke",data);
   })
   socket.on("redoUndo",(data)=>{
      io.sockets.emit("redoUndo",data);
   })

}) 
