const clear = document.querySelector(".clear"); // refresh button
const dateElement = document.getElementById("date"); // time container
const list = document.getElementById("list"); // list container
const input = document.getElementById("input"); // input field

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

let LIST, id;

let data = localStorage.getItem("TODO");


// read form localStorage
if (data){
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
}

// if localStorage is empty, create new array
else { 
  LIST = [];
  id = 0;
}

//create array from localStorage
function loadList(array) {
  array.forEach(function(item){
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

//refresh localStorage and TODO list on screen
clear.addEventListener("click", function(){
  localStorage.clear();
  location.reload();
});

const options = {weekday : 'long', month : 'short', day : 'numeric'};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//create list of todo
function addToDo(toDo, id, done, trash){

  //if todo already done, nothing will be done.
  if (trash) {
    return;
  }
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `<li class="item">   
                   <i class="fa ${DONE} co"  job="complete"  id="${id}" > </i>    
                  <p class="text ${LINE}"> ${toDo} </p>   
                  <i class="fa fa-trash-o de" job="delete" id="${id}"> </i> 
                </li>`;

  const position = "beforeend";

  list.insertAdjacentHTML(position, item);

}

//read only after press "enter" or "enter" button on smartphone keyboard

document.addEventListener("keyup" , function(event) {
  if (event.keyCode == 13) {
    const toDo = input.value;
    if (toDo){
      addToDo(toDo, id, false, false);
      LIST.push(
        {
          name : toDo,
          id :   id,
          done:  false,
          trash: false
        });
  
      localStorage.setItem("TODO", JSON.stringify(LIST));
      
      id++; 
      }
    input.value = "";
  }
});


//change style of done todo

function completeToDo (element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
  LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove todo from screen
function removeToDo(element){
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

//change style after click on circle

list.addEventListener("click", function(event) {
  const element = event.target;
  const elementJob = element.attributes.job.value;
  if (elementJob == "complete"){
    completeToDo(element);
  }
  else if (elementJob == "delete")
  {
    removeToDo(element);
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
});