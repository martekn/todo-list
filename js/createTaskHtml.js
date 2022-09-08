import { updateLocalStorage } from "./util.js";
const createHtmlElement = function (tag, className, nameIdFor, text, inputType) {
  const element = document.createElement(tag);
  element.classList.add(className);

  if (tag === "label") {
    element.setAttribute("for", nameIdFor);
  }

  if (tag === "input") {
    element.setAttribute("id", nameIdFor);
    element.setAttribute("name", nameIdFor);
    element.setAttribute("type", inputType);
  }

  if (text) {
    element.innerText = text;
  }

  return element;
};

const appendChildren = function (array, parent) {
  const children = array;
  for (const child of children) {
    parent.append(child);
  }
};

export const taskHtml = function (inputValue, beforeElement, tasks, id) {
  const taskWrapper = createHtmlElement("div", "task");
  const label = createHtmlElement("label", null, `task-status-${id}`);
  const deleteButton = createHtmlElement("button", "delete");
  deleteButton.addEventListener("click", function (e) {
    this.parentNode.remove(taskWrapper);
    tasks = tasks.filter((task) => task !== inputValue);
    updateLocalStorage(localStorageKey, tasks);
  });
  const deleteButtonContent = createHtmlElement("span", "material-symbols-outlined", null, "delete");
  const inputCheckbox = createHtmlElement("input", null, `task-status-${id}`, null, "checkbox");
  const customCheckbox = createHtmlElement("span", "custom-checkbox");
  const taskItem = createHtmlElement("span", "task-name", null, inputValue);
  appendChildren([inputCheckbox, customCheckbox, taskItem], label);
  appendChildren([deleteButtonContent], deleteButton);
  appendChildren([label, deleteButton], taskWrapper);
  beforeElement.parentNode.insertBefore(taskWrapper, beforeElement);
};

export const createTask = function (input, beforeElement, tasks) {
  // Get value from input
  const inputValue = input.value.trim();
  // Reset input field
  input.value = "";

  // If inputValue holds a value, create html
  if (inputValue) {
    taskHtml(inputValue, beforeElement, tasks, new Date().getTime());
    tasks.push(inputValue);
  }
};
