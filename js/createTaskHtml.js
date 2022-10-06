import { updateLocalStorage, createHtmlElement } from "./util.js";

/**
 * Creates a task based on arguments and appends before the beforeElement
 * @param {String} inputValue
 * @param {HTMLElement} beforeElement
 * @param {*[]} tasks
 * @param {*} id unique id
 */
export const taskHtml = function (inputValue, beforeElement, tasks, id) {
  const taskWrapper = createHtmlElement("div", "task");
  const label = createHtmlElement("label", null, `task-status-${id}`);

  const deleteButton = createHtmlElement("button", "delete");
  deleteButton.addEventListener("click", function (e) {
    taskWrapper.remove();
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

/**
 * Creates task if input value exists
 * @param {HTMLElement} input
 * @param {HTMLElement} beforeElement
 * @param {*[]} tasks
 */
export const createTask = function (input, beforeElement, tasks) {
  const inputValue = input.value.trim();
  input.value = "";

  if (inputValue) {
    taskHtml(inputValue, beforeElement, tasks, new Date().getTime());
    tasks.push(inputValue);
  }
};
