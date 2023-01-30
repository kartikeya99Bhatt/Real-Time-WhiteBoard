// logic for opening and closing of tool container
let optionCont=document.querySelector(".optionContainer")
let toolsCont=document.querySelector(".toolContainer"); 
let pencilToolCont=document.querySelector(".pencil")
let erasorToolCont=document.querySelector(".erasor")
let stickyCon=document.querySelector(".stickey-content");
let optionFlag=true;
/* true means tools box is showing 
   false means tools box is not visible
*/
optionCont.addEventListener("click",()=>{
    console.log("click perform ");
   optionFlag=!optionFlag ; 
   if(optionFlag){
     openToolBox();
   }
   else{
     closeToolBox();
   }
});
let openToolBox=()=>{ // open karna h 
  let iconElem=optionCont.children[0];
   iconElem.classList.remove("fa-times");
   iconElem.classList.add("fa-bars");
   toolsCont.style.display="flex"
} 
  
let closeToolBox=()=>{ 
    let iconElem=optionCont.children[0];
    iconElem.classList.remove("fa-bars");
    iconElem.classList.add("fa-times");
    toolsCont.style.display="none" 
}
// logic to make pencil tool on off
let pencilFlag=false;
 pencilToolCont.addEventListener("click",()=>{ 
    pencilFlag=!pencilFlag;
    if(pencilFlag){
        document.querySelector(".pencil-tool").style.display="block";
    }
    else
        document.querySelector(".pencil-tool").style.display="none";
});



// logic to make erasor tool
let eraserFlag=false;
erasorToolCont.addEventListener("click",()=>{
  eraserFlag=!eraserFlag;
  if(eraserFlag){
    document.querySelector(".erasor-tool-cont").style.display="block";
  }
  else{
    document.querySelector(".erasor-tool-cont").style.display="none";
  }
});

//stckey note onclick generate new stickey note
let stckeyNote=document.querySelector(".stickey");
stckeyNote.addEventListener("click",(e)=>{
  // logic for as may time i click on the stickey i get new stickey
  console.log("i am clicked stickey");
  let Newstickeyele=document.createElement("div");
  Newstickeyele.setAttribute("class","stickey-content");
  Newstickeyele.innerHTML=`
        <div class="stickeyHeaderCont">
        <div class="close">
          <img class="close" src="Icons/close-window.png" alt="">
        </div>
      </div>
      <div class="textCont">
        <textarea spellcheck="false" ></textarea>
      </div>
  `;
   document.body.appendChild(Newstickeyele);
  // calling drag and drop function
  Newstickeyele.onmousedown = function(event) { 
       DragAndDrop(Newstickeyele,event);
  }
  Newstickeyele.ondragstart = function() {
    return false;
  }

  let close=Newstickeyele.querySelector(".close");
  handleNodeFun(close,Newstickeyele);
});
// handling the functionality of the stickey Node

let handleNodeFun =(close,Newstickeyele)=>{
   
  close.addEventListener("click",()=>{
      Newstickeyele.remove();
    });
}
// drag and drop functionily
let DragAndDrop =(element,event )=>{
  

    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;
  
    element.style.position = 'absolute';
    element.style.zIndex = 1000;
  
    moveAt(event.pageX, event.pageY);
  
    // moves the element at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
      element.style.left = pageX - shiftX + 'px';
      element.style.top = pageY - shiftY + 'px';
    }
  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
  
    // move the element on mousemove
    document.addEventListener('mousemove', onMouseMove);
  
    // drop the element, remove unneeded handlers
    element.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      element.onmouseup = null;
    };
  };
   
  // upload functionality  
  // By file explore we can pick the image 
  let uploadDoc=document.querySelector(".upload");
  uploadDoc.addEventListener( "click",()=>{
    
    //open the file explore
    let input =document.createElement("input");
    input.setAttribute("type","file");
    input.click();
    // these above Three Line will open the  File explorer

    input.addEventListener("change",(e)=>{
      console.log(e);
      let file=input.files[0];
      let url=URL.createObjectURL(file);
    
              console.log("i am upload ");
              let NewUpload=document.createElement("div");
              NewUpload.setAttribute("class","stickey-content");
              NewUpload.innerHTML=`
                  <div class="stickeyHeaderCont">
                  <div class="close">
                    <img class="close" src="Icons/close-window.png" alt="">
                  </div>
                </div>
                <div class="textCont">
                  <img  class="newImg" src="${url}"/>
                </div>
            `;
              document.body.appendChild(NewUpload);
              // calling drag and drop function
              NewUpload.onmousedown = function(event) { 
                  DragAndDrop(NewUpload,event);
              }
              NewUpload.ondragstart = function() {
                return false;
              }
            
              let close=NewUpload.querySelector(".close");
              handleNodeFun(close,NewUpload);   
        });
      })   



 