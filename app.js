console.log('connected to app.js')
const url = "http://localhost:3000/todos"

let masterData

//Display all todos
const showTodos = document.querySelector(".showTodos")
const retrieveAll = async () => {
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            masterData = data
            organizeInfo(data)
        })
}


// Organize the todos by category
const organizeInfo = (data) => {

    let node = document.querySelector('.showTodos')

    node.innerHTML = ""

    allCategories = []

    data.forEach(d => {
        allCategories.push(d.category)
    })


    let uniqCategories = [...new Set(allCategories)]
    uniqCategories.forEach(cat => {
        showTodos.innerHTML += (`
            <div class="${cat}"><h1>${cat}</h1></div>
        `)
    })

    data.forEach(d => {
        let certainClass = document.querySelector(`.${d.category}`)
        certainClass.innerHTML += (`
            <p class="todo${d._id} todoEvent">${d.todo} <i class="fa fa-trash trash" aria-hidden="true"></i></p>
        `)
    })
}


//Add new todo button
const addBtn = document.querySelector("#addBtn")

addBtn.addEventListener('click', () => {
    addNewTodo()
})

//Add new todo function
const addNewTodo = async () => {
    let todoTitle = document.querySelector("#todoInput").value
    let todoCategory = document.querySelector("#categoryInput").value
    console.log(todoTitle)
    let newTodo = {
        todo: todoTitle,
        complete: false,
        category: todoCategory
    }

    const rawResponse = await fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo)
    });
    const content = await rawResponse.json();

    console.log(content);

    if (content) {
        retrieveAll()
    }

}

let todoList = document.querySelectorAll('.todoEvent')
const checkTodo = () => {

    todoList.forEach(todo => {
        todo.addEventListener('click', () => {
            let todo = document.getElementById(`todo${id}`)
            todo.style.textDecoration = 'line-through'
            console.log(todo)
        })
    })

}

retrieveAll()