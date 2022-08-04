const inputEl = document.getElementById("input");
const toDoList = document.getElementById("todo-list");
const add = document.getElementById("add");
const clearComplete = document.getElementById("clear-complete");
const empty = document.getElementById("empty");
const save = document.getElementById("save");
let listBag = [];

// restore the list if any saved lists exist
let existing = localStorage.getItem("toDos")


function render(itemText, completed) {
  let listItem = document.createElement("li");
  listItem.classList.add("unCompleted")
  let listText = document.createTextNode(itemText);
  listItem.appendChild(listText);
  if (completed) {
    listItem.classList.add("completed");
  }
  toDoList.appendChild(listItem);
  listItem.addEventListener("dblclick", toggleCompleteState);
}

// Adding Items to the list
add.addEventListener("click", function () {
  let itemText = inputEl.value;
  if (inputEl.value !== "") {
    listBag.push(itemText);
    inputEl.value = "";
    render(itemText, false);
  }
  console.log(listBag);
});

// Mark Items as complete
function toggleCompleteState() {
  if (this.classList.contains("completed")) {
    this.classList.remove("completed");
    this.classList.add("unCompleted")
  } else {
    this.classList.add("completed");
    this.classList.remove("unCompleted")
  }
}

// Delete Completed Items
function clearCompleted() {
  let completedItems = toDoList.getElementsByClassName("completed");
  while (completedItems.length > 0) {
    completedItems.item(0).remove();
  }
  console.log(completedItems);
}

clearComplete.addEventListener("click", function () {
  clearCompleted();
});

// Empty the list
empty.addEventListener("click", function () {
  listBag = [];
  toDoList.innerHTML = "";
  localStorage.clear();
});

// Save the list

function saveList() {
  let inComplete = Array.from(toDoList.getElementsByClassName("unCompleted"))
  for (i = 0; i < inComplete.length; i++) {
    localStorage.setItem("toDos", inComplete[i].childNodes)
    console.log(inComplete[i]);
  }
}

save.addEventListener("click", function () {
  saveList();
});
