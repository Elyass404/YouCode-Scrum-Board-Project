

let addTaskForm = document.getElementById("modal-task");
let updateTaskForm = document.getElementById("update-task");
let addTaskBtn = document.getElementById("add-task-btn");
let closeFormBtn = document.getElementById("close-btn");
let saveFormBtn = document.getElementById("task-save-btn");
let updateFormBtn = document.getElementById("task-update-btn");
let cancelFormBtn = document.getElementById("task-cancel-btn");
let updateCancelFormBtn = document.getElementById("update-task-cancel-btn");
//-------------task form variables--------------
function addTask(evnt){
    evnt.preventDefault();
    let id = document.getElementById("task-id").value = Date.now().toString(); 
    let taskTitle =document.getElementById("task-title").value;  
    let type = document.getElementById("task-type-feature").value;
    let priority = document.getElementById("task-priority").value; 
    let status = document.getElementById("task-status").value;
    let taskDate = document.getElementById("task-date").value;
    let description = document.getElementById("task-description").value;
     
    let taskObj = {id, taskTitle, priority, status, taskDate, description, type};

    saveTasksLocaly(taskObj);
    resetInputs();
    addTaskForm.style.display="none";
}
saveFormBtn.addEventListener("click", addTask); 


function resetInputs(){
  document.getElementById("task-id").value = ""; 
    document.getElementById("task-title").value = "";  
    document.getElementById("task-type-feature").value = "";
    document.getElementById("task-priority").value = ""; 
    document.getElementById("task-status").value = "";
    document.getElementById("task-date").value = "";
    document.getElementById("task-description").value = "";
}

// ---------function to save the taks in the local storage------- rak nadi kml 

function saveTasksLocaly(task){
    let tasksArray = JSON.parse(localStorage.getItem("tasks"));
    if (tasksArray === null){
        tasksArray = [];
    }
    
    tasksArray.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    console.log("rak wsslti hna ghir thna");

    showTasks(task)
}

// ---------function to show the task in the screen after save------- 
function showTasks(task){
    let tasksArray = JSON.parse(localStorage.getItem("tasks"));
    if(tasksArray === null){
        tasksArray = [];
    }

    let toDoList = document.getElementById("to-do-tasks-list");
    let inProgressList = document.getElementById("in-progress-tasks-list");
    let doneList = document.getElementById("done-tasks-list");

    let taskContainer = document.createElement("a");
    taskContainer.className = "list-group-item list-group-item-action d-flex task-item bg-yellow";
    taskContainer.draggable = true;
    taskContainer.href = "#";

    taskContainer.innerHTML =`
                  <div class="me-3 fs-16px"><i class="far fa-question-circle text-gray-500 fa-fw"></i></div>
                  <div class="flex-fill">
                    <input type="hidden" value="${task.id}" class="task-id">
                    <div class="fs-14px lh-12 mb-2px fw-bold text-dark">${task.taskTitle}</div>
                    <div class="mb-1 fs-12px">
                      <div class="text-gray-600 flex-1">${task.id}</div>
                    </div>
                    <div class="mb-1 fs-12px">
                      <div class="text-gray-600 flex-1">${task.taskDate}</div>
                    </div>
                    <div class="mb-1 fs-12px">
                      <div class="text-gray-600 flex-1">${task.description}</div>
                    </div>
                    <div class="mb-1">
                      <span class="badge bg-gray-300 text-gray-900">${task.priority}</span>
                      <span class="badge bg-indigo">${task.type}</span>
                      <div class="task-buttons ">
                          <span><button class="btn btn-warning task-action-btn" id="updated-btn" onclick="clickingUpdate('${task.id}')">update</button></span>
                          <span><button class="btn btn-danger task-action-btn " id="delete-btn" onclick="deleteTask('${task.id}')">delete</button></span>

                      </div>
                    </div>
                  </div>
             `;
             switch(task.status) {
                case "To Do":
                 toDoList.appendChild(taskContainer);  
                  break;
                case "In Progress":
                    inProgressList.appendChild(taskContainer);  
                  break;
                  case "Done":
                    doneList.appendChild(taskContainer);  
                  break;
                default:
                  console.log("hello");
              }
}

 // ---------function to show the task in the screen whenever we road th e site------- 
 function loadTasks(){
    let tasksArray = JSON.parse(localStorage.getItem("tasks"));
    if(tasksArray === null){
        tasksArray = [];
    }

    tasksArray.forEach(task => {
        showTasks(task);
    });
 }

 document.addEventListener("DOMContentLoaded", loadTasks)
// --------- Delete function to delete the task in the local storage and not show in the list ------- 

function deleteTask(id){
  let tasksArray = JSON.parse(localStorage.getItem('tasks'));
  if(tasksArray !== null){
    tasksArray = tasksArray.filter(task => task.id !== id);
    localStorage.setItem('tasks',JSON.stringify(tasksArray));
    location.reload(); //l3saaaaaaa hahahah 
  }
}

// ---------show the task information when clicking on the update button  -------

function closing(evnt){
  // evnt.preventDefault();
  updateTaskForm.style.backgroundColor = "blue";
}
document.getElementById("hello").addEventListener('click', closing); 

function clickingUpdate(id){
  let tasksArray = JSON.parse(localStorage.getItem('tasks'));
  let task = tasksArray.find(task => task.id === id);
  console.log(task);
    
    document.getElementById("update-task-id").value = task.id;
    document.getElementById("update-task-title").value = task.taskTitle;
    document.getElementById("update-task-type-feature").value = task.type;
    document.getElementById("update-task-priority").value = task.priority;
    document.getElementById("update-task-date").value = task.taskDate;
    document.getElementById("update-task-status").value = task.status;
    document.getElementById("update-task-description").value = task.description;

    updateTaskForm.style.display = "block";
}


function updateTask(evnt){
  evnt.preventDefault();
  let id = document.getElementById("update-task-id").value ;
  let taskTitle =document.getElementById("update-task-title").value;  
  let type = document.getElementById("update-task-type-feature").value;
  let priority = document.getElementById("update-task-priority").value; 
  let status = document.getElementById("update-task-status").value;
  let taskDate = document.getElementById("update-task-date").value;
  let description = document.getElementById("update-task-description").value;
   
  let taskObj = {id, taskTitle, priority, status, taskDate, description, type};

  storeUpdatedTask(id,taskObj);
  updateTaskForm.style.display="none";
}
 
function storeUpdatedTask(taskId, taskNewInfo){
let tasksArray = JSON.parse(localStorage.getItem('tasks'));
let taskIndex = tasksArray.findIndex(task => task.id === taskId);

  tasksArray[taskIndex].taskTitle = taskNewInfo.taskTitle;
  tasksArray[taskIndex].priority = taskNewInfo.priority;
  tasksArray[taskIndex].status = taskNewInfo.status;
  tasksArray[taskIndex].taskDate = taskNewInfo.taskDate;
  tasksArray[taskIndex].description = taskNewInfo.description;
  tasksArray[taskIndex].type = taskNewInfo.type;

  localStorage.setItem('tasks', JSON.stringify(tasksArray));
  location.reload();
}

updateFormBtn.addEventListener("click",updateTask)







function openForm(){
    addTaskForm.style.display="block";
}
addTaskBtn.addEventListener("click", openForm);

function closeForm(){
    addTaskForm.style.display="none";
}
closeFormBtn.addEventListener("click", closeForm);

cancelFormBtn.addEventListener("click", ()=>{addTaskForm.style.display="none";});
updateCancelFormBtn.addEventListener("click", ()=>{updateTaskForm.style.display = "none";});




// //to obtain the value of an input element inside a form (this is just a way not the only way) example below

// {/* <form id="myForm" action="/action_page.php">
//   First name: <input type="text" name="fname" value="Donald"><br>
//   Last name: <input type="text" name="lname" value="Duck"><br>
//   <input type="submit" value="Submit">
// </form>  */}

// document.getElementById("myForm").elements.namedItem("fname").value;

 

 