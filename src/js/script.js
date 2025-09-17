const inputBox = document.querySelector(".js-input-box");
const list = document.querySelector(".js-list");
const addBtn = document.querySelector(".js-add-btn");
const clearBtn = document.querySelector(".js-clear-btn");
const taskProgress = document.querySelector(".js-task-progress");

function loadTask() {

    if (inputBox.value.trim() === "") return;

    const checkbox = document.createElement("div");
    checkbox.classList.add("todo-checkbox");

    const task = document.createElement("p");

    task.textContent = inputBox.value;

    const del = document.createElement("div");
    del.classList.add("todo-del");

    del.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

    const taskDiv = document.createElement("div");
    taskDiv.classList.add("todo-div-pri");

    const taskDiv2 = document.createElement("div");
    taskDiv2.classList.add("todo-div-sec");

    inputBox.value = "";

    taskDiv.appendChild(checkbox);
    taskDiv2.appendChild(task);
    taskDiv2.appendChild(del);
    taskDiv.appendChild(taskDiv2);
    list.appendChild(taskDiv);

    checkbox.addEventListener("click", () => {
        task.classList.toggle("done");
        if (task.classList.contains("done")) {
            handleCheckboxTrack();
            checkbox.innerHTML = `<i class="fa-solid fa-check"></i>`;
            checkbox.classList.add(
                "bg-green-500",
                "text-base"
            );
        }
        else {
            handleCheckboxTrack();
            checkbox.innerHTML = "";
            checkbox.classList.remove(
                "bg-green-500",
                "text-base"
            );
        }
    });

    del.addEventListener("click", () => {
        taskDiv.remove();
        handleClearBtn();
        handleCheckboxTrack();
    });

    clearBtn.addEventListener("click", () => {
        list.innerHTML = "";
        handleClearBtn();
        handleTaskProgress();
    });

    handleClearBtn();
    handleTaskProgress();
}

function handleClearBtn() {
    if (list.children.length > 0) {
        clearBtn.style.display = "flex";
    }
    else {
        clearBtn.style.display = "none";
    }
}

function handleTaskProgress() {
    let total = list.children.length;
    let done = list.querySelectorAll(".done").length;

    if (total === 0 || done === 0) {
        checkboxTrack.textContent = "";
    }
    else if (done === total) {
        checkboxTrack.innerHTML = `<span class="font-bold">All done.</span> Great job!`;
    }
    else {
        checkboxTrack.textContent = `${done}/${total} Done`;
    }
}

inputBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") loadTask();
});

addBtn.addEventListener("click", loadTask);