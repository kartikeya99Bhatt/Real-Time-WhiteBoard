/*
   Intoduction of Canvas :
it is used for to perform grafics;
it is the element of the HTML
canvas has also provide its API so that user can design its own grafics
*/
let canvas=document.querySelector("canvas");
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;

//API
let tool=canvas.getContext("2d"); // this is a API by which we can do graphics like : if we want to draw someting 
tool.strokeStyle="blue";
tool.lineWidth="3"; // width of graphic

let erasorWidth="3";
let erasorColor="white";
/////////////////////////////////
// redo and undo giving functionality
let undoReadoTracker=[] // Contain data in form of url of image 
let url=canvas.toDataURL();
undoReadoTracker.push(url);
let track=1;
///////////////////
 //  static 
// tool.beginPath ();// new graphics
// tool.moveTo(10,10) ; // stating point 
// tool.lineTo(124,100); //end point 
// tool.stroke(); // fill the graphic

// logic for pencli to write
// mousedown->start new path , mousemove->path fill
let draw=false; // start with no drawing 



canvas.addEventListener("mousedown",(e)=>{
    console.log("Kartikeya bHATT",e);
    draw=true;
   //   beginPath( {
   //    x: e.clientX,
   //    y: e.clientY
   //  })
    let data={
      x: e.clientX,
      y: e.clientY
    }
   // beginPath(data);
  socket.emit("beginPath", data);
})
function beginPath(strokeObj) {
   tool.beginPath();
   tool.moveTo(strokeObj.x, strokeObj.y);
}
canvas.addEventListener("mousemove",(e)=>{
   if(draw){
      let data={
         x:e.clientX,
         y:e.clientY,
         color:eraserFlag?erasorColor:tool.strokeStyle,
         width:eraserFlag?erasorWidth:tool.lineWidth
      }
      // drawStroke({
      //    x:e.clientX,
      //    y:e.clientY,
      //    color:eraserFlag?erasorColor:tool.strokeStyle,
      //    width:eraserFlag?erasorWidth:tool.lineWidth
      // }) 
      socket.emit("drawStroke", data);
    // drawStroke(data);
   }
})  

function drawStroke(strokeObj) {
   tool.strokeStyle = strokeObj.color;
   tool.lineWidth = strokeObj.width;
   tool.lineTo(strokeObj.x, strokeObj.y);
   tool.stroke();
}

canvas.addEventListener("mouseup",()=>{
   draw=false; 

   // undo redo storingimage 
   let url=canvas.toDataURL();
   undoReadoTracker.push(url);
   track=undoReadoTracker.length-1;
   console.log("the vlue of track is ",track);
})



// change of the color of the pencil
let pencil_color_cont=document.querySelectorAll(".pencil-color");
pencil_color_cont.forEach((colorElem)=>{
   colorElem.addEventListener("click",(e)=>{
      let color=colorElem.classList[0];
     // console.log(color);
      tool.strokeStyle=color;
   });
})
// adjusting the pencil width
let pencilWidthEle=document.querySelector(".pencil-width")
pencilWidthEle.addEventListener("change",(e)=>{
   tool.lineWidth=pencilWidthEle.value;
})
 
// adjesting the erasor width 

let erasorWidthEle=document.querySelector(".erasor-width");
erasorWidthEle.addEventListener("change",()=>{
   tool.lineWidth=erasorWidth=erasorWidthEle.value;
})
erasorToolCont.addEventListener("click",()=>{
   if(eraserFlag){ // it  is define in tool.js file
     tool.strokeStyle=erasorColor;
     tool.lineWidth=erasorWidth;
   }
   else{
      tool.strokeStyle="blue";
   }
})

// giving functionality with download icon
let download=document.querySelector(".download");
  download.addEventListener("click",()=>{
   let url=canvas.toDataURL();
   let a=document.createElement("a");
   a.href=url;
   a.download="board.jpg";
   a.click();
})

// undo reado
let performRedo=document.querySelector(".redo");
let performUndo=document.querySelector(".undo");

performUndo.addEventListener("click",(e)=>{
   console.log("I am going to perform undo function ");
  if(track>0)
  {
    track--;
    console.log(`we need the image of track ${track}`);
    //action
    let data={ 
    trackVal:track,
    undoReadoTracker    
     }
   // undoReadoCanvas(data);
    socket.emit("redoUndo",data)
  }
})

performRedo.addEventListener("click",(e)=>{
   console.log("click perform on redo",undoReadoTracker);
  if(track<undoReadoTracker.length-1){
    track++; 
  }
  //action
  let data={ 
   trackVal:track,
   undoReadoTracker    
    }
   //undoReadoCanvas(data);
  socket.emit("redoUndo",data)
})



function undoReadoCanvas(trackobj){
   track=trackobj.trackVal;
   undoReadoTracker=trackobj.undoReadoTracker ;
    console.log("I am undoRedoCnvas ,The value of trck is ",track);
   let url=undoReadoTracker[track];
   let img=new Image();
   img.src=url;
   tool.clearRect(0, 0, canvas.width, canvas.height);// clear the canvas
   img.onload=(e)=>{
    tool.drawImage(img,0,0,canvas.width,canvas.height);
   }

}

// data from server to all connection 
socket.on("beginPath",(data)=>{
   beginPath(data);
})

socket.on("drawStroke", (data) => {
   drawStroke(data);
})

socket.on("redoUndo",(data)=>{
   undoReadoCanvas(data);
})

