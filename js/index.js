import { createTask, taskHtml } from "./createTaskHtml.js";
import { updateLocalStorage } from "./util.js";
const input = document.querySelector(".task-input input");
const inputButton = document.querySelector(".task-input button");
const clearButton = document.querySelector(".clear");
let tasks = [];
const localStorageKey = "tasks";
window.localStorageKey = localStorageKey;

if (localStorage.getItem(localStorageKey) !== null) {
  tasks = JSON.parse(localStorage.getItem(localStorageKey));
  for (const task of tasks) {
    taskHtml(task, clearButton, tasks);
  }
}

inputButton.addEventListener("click", function () {
  createTask(input, clearButton, tasks);
  updateLocalStorage(localStorageKey, tasks);
});

input.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    createTask(input, clearButton, tasks);
    updateLocalStorage(localStorageKey, tasks);
  }
});

clearButton.addEventListener("click", function (e) {
  const currentTasks = document.querySelectorAll(".task");
  for (const task of currentTasks) {
    task.remove();
  }

  tasks = [];
  updateLocalStorage(localStorageKey, tasks);
});
