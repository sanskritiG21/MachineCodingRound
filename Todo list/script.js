document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.querySelector(".todo-form");
  const todoInput = document.querySelector(".todo-input");
  const todoSubmit = document.querySelector(".todo-submit");
  const todoList = document.querySelector(".todo-list");

  let editMode = false;
  let editItem = null;

  const addTodoItem = (todoText) => {
    const todoItem = document.createElement("li");
    const editbutton = document.createElement("button");
    const removeButton = document.createElement("button");

    todoItem.innerHTML = `<span> ${todoText} </span>`;
    editbutton.innerText = "🖊️";
    removeButton.innerText = "❌";

    todoItem.appendChild(editbutton);
    todoItem.appendChild(removeButton);
    todoList.appendChild(todoItem);
  };

  todoList.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "BUTTON") {
      const todoParent = target.parentNode;
      if (target.innerText === "❌") {
        todoParent.remove();
      } else if (target.innerText === "🖊️") {
        editMode = true;
        editItem = todoParent;
        todoSubmit.innerHTML = "Edit Todo";
        todoInput.value = todoParent.firstChild.textContent;
        //   shift focus to inputbox
        todoInput.focus();
      }
    }
  });

  todoForm.addEventListener("submit", (e) => {
    const todoText = todoInput.value.trim();

    if (todoText) {
      if (editMode) {
        editItem.firstChild.textContent = todoText;
        todoSubmit.innerText = "Add Todo";
        editMode = false;
        editItem = null;
      } else {
        addTodoItem(todoText);
      }
      todoInput.value = ""; //Clear the value of the input field
    } else {
      alert("please add a task");
    }

    e.preventDefault();
  });
});
