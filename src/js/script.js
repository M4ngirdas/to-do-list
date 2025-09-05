const inputBox = document.querySelector(".js-input-box");
const list = document.querySelector(".js-list");
const addBtn = document.querySelector(".js-add-btn");
const clearBtn = document.querySelector(".js-clear-btn");

function loadTask() {
    if (inputBox.value.trim() === "") return;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const task = document.createElement("p");

    task.textContent = inputBox.value;

    const del = document.createElement("i");

    del.classList.add("del");

    del.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

    const taskDiv = document.createElement("div");

    const taskDiv2 = document.createElement("div");
    taskDiv2.classList.add("taskDiv2");

    inputBox.value = "";

    taskDiv2.appendChild(checkbox);
    taskDiv2.appendChild(task);
    taskDiv.appendChild(taskDiv2);
    taskDiv.appendChild(del);
    list.appendChild(taskDiv);

    checkbox.addEventListener("click", () => {
        checkbox.checked ? task.classList.add("done") : task.classList.remove("done");
    });

    del.addEventListener("click", () => {
        taskDiv.remove();
        handleClearBtn();
    });

    clearBtn.addEventListener("click", () => {
        list.innerHTML = "";
        handleClearBtn();
    });

    handleClearBtn();
}

function handleClearBtn() {
    if (list.children.length > 0) {
        clearBtn.style.display = "flex";
    }
    else {
        clearBtn.style.display = "none";
    }
}

inputBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        loadTask();
    }
});

addBtn.addEventListener("click", loadTask);