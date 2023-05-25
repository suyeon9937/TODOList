const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

/* 
1. 삭제 버튼 추가
2. 저장 되도록
3. 삭제 버튼 -> 저장된 데이터 업데이트
*/

//로컬 스토리지 저장
let todos = [];

const save = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// 삭제 버튼 -> 해당 li만 삭제
const delItem = (event) => {
  const target = event.target.parentElement;

  todos = todos.filter((todo) => todo.id != target.id);
  save();

  target.remove();
};

// 빈문자가 아니면, 목록 추가
// 삭제 버튼 추가
const addItem = (todo) => {
  if (todo.text !== '') {
    const li = document.createElement('li');
    const button = document.createElement('button');
    const span = document.createElement('span');

    span.innerText = todo.text;
    button.innerText = '삭제';
    button.addEventListener("click", delItem)

    li.appendChild(span);
    li.appendChild(button);
    ul.appendChild(li);
    li.id = todo.id;
  }
};

const handler = (event) => {
  event.preventDefault();

  const todo = {
    id: Date.now(),
    text: input.value,
  };

  todos.push(todo);
  addItem(todo);
  save();
  
  input.value = '';
};

const init = () => {
  const userTodos = JSON.parse(localStorage.getItem('todos'));

  if(userTodos) {
    userTodos.forEach((todo) => {
      addItem(todo);
    });
    
    todos = userTodos;
  }
};

form.addEventListener('submit', handler);
