class Storage {
   constructor(key){
       this.key = key;
   }
getStorage() {
  const data = window.localStorage.getItem(this.key);
  if(data){
      return JSON.parse(data)
  }
  return data; 
}

save(data) {
    window.localStorage.setItem(this.key, JSON.stringify(data));
}

}
const storage = new Storage('app-state');   

let state = {
    todos: [],
}

const todoItemHTML = (todo_item, i) => {
   return  ` 
   <li class="list-group-item d-flex justify-content-between align-items-center">${todo_item}
   <span class="badge badge-primary badge-pill" data-i="${i}">X</span>
   </li>`
}

const completeItemHTML = (todo_item, i)=>{
    return `
    <li class="list-group-item d-flex justify-content-between align-items-center">${todo_item}
    <span class="badge badge-primary badge-pill p-3 mb-2 bg-secondary text-white" data-i="${i}">X</span>
    </li>`
}

const render = state => {

  const list =  document.querySelector('.js-list');
  let liElements= "";
  for(let i = 0; i < state.todos.length; i++){
      liElements += todoItemHTML(state.todos[i], i);
  }
 list.innerHTML = liElements;
}
render(state)

const input = document.querySelector('.js-input')
input.addEventListener('keydown', e=>{
    if(e.key === 'Enter'){
        state.todos.push(input.value);
        input.value = "";
        storage.save(state)
        render(state)
    }
})

const deleteItem = document.querySelector('.js-list');
deleteItem.addEventListener('click', e=>{
    if(e.target.nodeName === "SPAN"){
        const i = e.target.getAttribute('data-i')
        state.todos.splice(i,1);
        storage.save(state)
        render(state)
    }
    
})
const completItem = document.querySelector('.js-list');
completItem.addEventListener('click', e=>{
    console.log("you clicked me")
    if(e.target.matches('.list-group-item')){
        const item = e.target.getAttribute('data-i')
        console.log(item)
        storage.save(state);
       render(state)
    }
    
})


//checking if there is anything in the local storage 
const stored_state = storage.getStorage();
if(stored_state){
    state = stored_state
}
render(state)