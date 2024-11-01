let addTaskForm = document.getElementById("modal-task");
let addTaskBtn = document.getElementById("add-task-btn");
let closeFormBtn = document.getElementById("close-btn");


function openForm(){
    addTaskForm.style.display="block";
}
addTaskBtn.addEventListener("click", openForm);

function closeForm(){
    addTaskForm.style.display="none";
}
closeFormBtn.addEventListener("click", closeForm);


 

 