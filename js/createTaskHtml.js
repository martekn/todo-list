import { updateLocalStorage, createHtmlElement } from "./util.js";

export const taskHtml = function (inputValue, beforeElement, tasks, id) {
  const taskWrapper = createHtmlElement("div", "task");
  const label = createHtmlElement("label", null, `task-status-${id}`);

  const deleteButton = createHtmlElement("button", "delete");
  deleteButton.addEventListener("click", function (e) {
    this.parentNode.remove(taskWrapper);
    tasks = tasks.filter((task) => task !== inputValue);
    updateLocalStorage(localStorageKey, tasks);
  });
  deleteButton.innerHTML = `<span class='material-symbols-outlined'> delete </span>`;

  const inputCheckbox = createHtmlElement("input", null, `task-status-${id}`, null, "checkbox");
  const customCheckbox = createHtmlElement("span", "custom-checkbox");
  const taskItem = createHtmlElement("span", "task-name", null, inputValue);

  label.append(inputCheckbox, customCheckbox, taskItem);
  taskWrapper.append(label, deleteButton);
  beforeElement.parentNode.insertBefore(taskWrapper, beforeElement);
};

export const createTask = function (input, beforeElement, tasks) {
  const inputValue = input.value.trim();
  input.value = "";

  if (inputValue) {
    taskHtml(inputValue, beforeElement, tasks, new Date().getTime());
    tasks.push(inputValue);
  }
};
