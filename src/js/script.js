
const taskInput = document.querySelector(".js-task-input");
const taskList = document.querySelector(".js-task-list");
const taskAdd = document.querySelector(".js-task-add");
const taskClear = document.querySelector(".js-task-clear");
const taskProgress = document.querySelector(".js-task-progress");

function loadTask() {

    if (taskInput.value.trim() === "") return;

    const checkbox = document.createElement("div");
    checkbox.classList.add("todo-checkbox");

    const task = document.createElement("p");

    task.textContent = taskInput.value;

    const del = document.createElement("div");
    del.classList.add("todo-del");

    del.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

    const taskDiv = document.createElement("div");
    taskDiv.classList.add("todo-div-pri");

    const taskDiv2 = document.createElement("div");
    taskDiv2.classList.add("todo-div-sec");

    taskInput.value = "";

    taskDiv.appendChild(checkbox);
    taskDiv2.appendChild(task);
    taskDiv2.appendChild(del);
    taskDiv.appendChild(taskDiv2);
    taskList.appendChild(taskDiv);

    checkbox.addEventListener("click", () => {
        task.classList.toggle("done");
        if (task.classList.contains("done")) {
            handleTaskProgress();
            checkbox.innerHTML = `<i class="fa-solid fa-check"></i>`;
            checkbox.classList.add(
                "bg-green-500",
                "text-base",
            );
        }
        else {
            handleTaskProgress();
            checkbox.innerHTML = "";
            checkbox.classList.remove(
                "bg-green-500",
                "text-base"
            );
        }
    });

    del.addEventListener("click", () => {
        taskDiv.remove();
        handleTaskClear();
        handleTaskProgress();
    });

    taskClear.addEventListener("click", () => {
        if (taskClear.textContent === "Clear all") {
            taskClear.textContent = "Are you sure?";
            taskClear.setTimeout(() => {
                taskClear.textContent = "Clear all";
            }, 2000);
        }
        else {
            taskList.innerHTML = "";
        }

        handleTaskProgress();
    });

    handleTaskClear();
    handleTaskProgress();
}

function handleTaskClear() {
    taskList.children.length > 0 ? taskClear.style.display = "flex" : taskClear.style.display = "none";
}

function handleTaskProgress() {
    let total = taskList.children.length;
    let done = taskList.querySelectorAll(".done").length;

    if (total === 0 || done === 0) {
        taskProgress.textContent = "";
    }
    else if (done === total) {
        taskProgress.innerHTML = `<span class="font-bold text-green-500">All done.</span>`;
    }
    else {
        taskProgress.textContent = `${done}/${total} Done`;
    }
}

function handleTodoRename(open) {
    const settings = document.querySelector(".js-todo-settings");

    open ? settings.style.display = "grid" : settings.style.display = "none";

    const title = document.querySelector(".js-todo-title");
    const desc = document.querySelector(".js-todo-desc");
    const titleInput = document.querySelector(".js-todo-title-input")
    const descInput = document.querySelector(".js-todo-desc-input");

    document.querySelector(".js-rename-save").addEventListener("click", () => {
        title.textContent = titleInput.value;
        desc.textContent = descInput.value;
    });
}

document.querySelector(".js-todo-rename").addEventListener("click", () => handleTodoRename(true));
document.querySelector(".js-rename-save").addEventListener("click", () => handleTodoRename(false));
document.querySelector(".js-rename-close").addEventListener("click", () => handleTodoRename(false));

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") loadTask();
});

taskAdd.addEventListener("click", loadTask);