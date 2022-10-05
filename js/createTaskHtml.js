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
