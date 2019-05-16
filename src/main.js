"use strict";

//---------- Date section start ----------//


function pageDate() {

    let taskTime, nowDate, fullDate, month, date, day, fullTime, hours, minutes;

    nowDate = new Date();



    //----- fullDate adjustments start -----//
    month = nowDate.getMonth();
    switch (month) {
        case 0:
            month = "January";
            break;
        case 1:
            month = "February";
            break;
        case 2:
            month = "March";
            break;
        case 3:
            month = "April";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "June";
            break;
        case 6:
            month = "July";
            break;
        case 7:
            month = "August";
            break;
        case 8:
            month = "September";
            break;
        case 9:
            month = "October";
            break;
        case 10:
            month = "November";
            break;
        case 11:
            month = "December";
            break;
        default:
            break;
    }

    date = nowDate.getDate();

    day = nowDate.getDay();
    switch (day) {
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
        case 7:
            day = "Sunday";
            break;
        default:
            break;
    }

    fullDate = `${day}, ${month} ${date}`;
    document.getElementById("date").textContent = fullDate;

    //----- fullDate adjustments end -----//


    //----- Time adjustments start -----//
    hours = nowDate.getHours();
    minutes = nowDate.getMinutes();

    // minutes adjustment output
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    // hours adjustment output
    if (hours > 12) {
        hours = hours - 12;
        fullTime = `${hours}:${minutes} pm`;
    } else if (hours === 24) {
        hours = 0;
        fullTime = `${hours}:${minutes} am`;
    } else if (hours === 12) {
        fullTime = `${hours}:${minutes} pm`;
    }
    else {
        fullTime = `${hours}:${minutes} am`;
    }
    //----- Time adjustments end -----//
    document.getElementById("time").textContent = fullTime;
}



pageDate();
setInterval(pageDate, 0);

//---------- Date section end ----------//
















//---------- Task list section start ----------//
// Task list
const list = document.getElementById("task-list");
// Input field
const inputField = document.getElementById("task-input");
// Input button
const addBTN = document.getElementById("add-button");

// Adding task by pressing Enter
document.addEventListener("keyup", (event) => {
    if (event.keyCode == 13) {
        let task = inputField.value;
        if (task) {
            addTask(task, id, false, false, awaiting);
            taskList.push(
                {
                    name: task,
                    id: id,
                    done: false,
                    trash: false
                }
            );
            inputField.value = "";
            id++;
        }
    }

});

// Adding task by pressing add-button
addBTN.addEventListener("click", () => {
    const task = inputField.value;
    if (task) {
        addTask(task, id, false, false, awaiting);
        taskList.push(
            {
                name: task,
                id: id,
                done: false,
                trash: false,
                progress: awaiting
            }
        );
        inputField.value = "";
        id++;
    }
});









// System of storing tasks
let taskList = [];
let id = 0;

// Special states for tasks
const CHECK = "checked";
const UNCHECK = "unchecked";

const LINE_THROUGH = "lineThrough";

let currentProgress = "";

const awaiting = "awaiting";
const active = "active";
const completed = "completed";


// ---------- Functions ---------- //

function addTask(task, id, done, trash, progress) {

    if (trash) return;

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const position = "beforeEnd";

    currentProgress = progress;

    const taskBody = `<li class="task-section__list__item">
                        <div class="task-status">
                            <div class="responsible">Responsible: Anton</div>
                            <div class="progress ${awaiting}">awaiting</div>
                        </div>
                        <i id=${id} class="${DONE} complete"></i>
                        <p class="task-text ${LINE}">${task}</p>
                        <i id=${id} class="trash-bin delete"></i>
                    </li>`;



    list.insertAdjacentHTML(position, taskBody);
}

function completeTask(element) {
    
    const taskText = element.parentNode.getElementsByClassName("task-text")[0];
    const listItemProgress = element.previousElementSibling.getElementsByClassName("progress")[0];

    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);

    taskText.classList.toggle(LINE_THROUGH);

    taskList[element.id].done = taskList[element.id].done ? false : true;

    listItemProgress.classList.toggle(currentProgress);
    listItemProgress.classList.toggle(completed);
    
    if ( listItemProgress.classList.contains(completed) ) {
        listItemProgress.textContent = completed;
    } else {
        listItemProgress.textContent = currentProgress;
    }
    
}


function deleteTask(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    taskList[element.id].trash = true;
}

function changeProgress(element) {
    if ( element.classList.contains(awaiting) ) {
        element.classList.toggle(awaiting);
        element.classList.add(active);
        currentProgress = active;
        element.textContent = active;

    } else if ( element.classList.contains(active) ) {
        element.classList.toggle(active);
        element.classList.add(awaiting);
        currentProgress = awaiting;
        element.textContent = awaiting;
    }
}

list.addEventListener("click", function(event) {
    let element = event.target;

    const completeClass = element.classList.contains("complete");
    const deleteClass = element.classList.contains("delete");
    const progressStatus = element.classList.contains("progress");
    if (completeClass){
        completeTask(element);
    } else if (deleteClass) {
        deleteTask(element);
    } else if (progressStatus) {
        changeProgress(element);
    }

});
//---------- Task list section end ----------//

