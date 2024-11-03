let draggables = document.querySelectorAll(".task-item");
let droppables = document.querySelectorAll(".to-do-list");

draggables.forEach((task) => {
    task.addEventListener("dragstart",()=>{ 
        task.classList.add("dragging");
    });
    task.addEventListener("dragend",()=>{ 
        task.classList.remove("dragging");
    });

    
});