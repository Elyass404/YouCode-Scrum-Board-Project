

let addTaskForm = document.getElementById("modal-task");
let addTaskBtn = document.getElementById("add-task-btn");
let closeFormBtn = document.getElementById("close-btn");
let saveFormBtn = document.getElementById("task-save-btn");
let cancelFormBtn = document.getElementById("task-cancel-btn");
//-------------task form variables--------------
function addTask(evnt){
    evnt.preventDefault();
    let taskTitle =document.getElementById("task-title").value;  
    let type = document.getElementById("task-type-feature").value;
    let priority = document.getElementById("task-priority").value; 
    let status = document.getElementById("task-status").value;
    let taskDate = document.getElementById("task-date").value;
    let description = document.getElementById("task-description").value;
     

    let taskObj = {taskTitle, priority, status, taskDate, description, type};

    saveTasksLocaly(taskObj);
    resetInputs();
    addTaskForm.style.display="none";
}
saveFormBtn.addEventListener("click", addTask); 

function resetInputs(){
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
                    <div class="fs-14px lh-12 mb-2px fw-bold text-dark">${task.taskTitle}</div>
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
                          <span><button id="updated-btn">update</button></span>
                          <span><button id="delete-btn">delete</button></span>
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
        showTasks(task)
    });
 }

 document.addEventListener("DOMContentLoaded", loadTasks)






function openForm(){
    addTaskForm.style.display="block";
}
addTaskBtn.addEventListener("click", openForm);

function closeForm(){
    addTaskForm.style.display="none";
}
closeFormBtn.addEventListener("click", closeForm);
cancelFormBtn.addEventListener("click", ()=>{addTaskForm.style.display="none";});




// //to obtain the value of an input element inside a form (this is just a way not the only way) example below

// {/* <form id="myForm" action="/action_page.php">
//   First name: <input type="text" name="fname" value="Donald"><br>
//   Last name: <input type="text" name="lname" value="Duck"><br>
//   <input type="submit" value="Submit">
// </form>  */}

// document.getElementById("myForm").elements.namedItem("fname").value;

 

 