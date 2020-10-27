console.log('connected to app.js')
const url = "http://localhost:3000/todos"


//Display all todos
const showTodos = document.querySelector(".showTodos")
const retrieveAll = async () => {
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            organizeInfo(data)
        })
}

//Get a uniq set of categories
const categoryParser = (data) => {
    allCategories = []

    data.forEach(d => {
        allCategories.push(d.category)
    })

    let uniqCategories = [...new Set(allCategories)]

    return uniqCategories
}


// Organize the todos by category
const organizeInfo = (data) => {

    showTodos.innerHTML = ""

    let uniqCategories = categoryParser(data)


    uniqCategories.forEach(cat => {
        showTodos.innerHTML += (`
            <div class="${cat}"><h1>${cat}</h1></div>
        `)
    })

    data.forEach(d => {
        let certainClass = document.querySelector(`.${d.category}`)
        
        //create todo
        let todo = document.createElement('p')
        todo.id = `todo${d._id}`
        todo.innerText = d.todo
        certainClass.appendChild(todo)

        //create icon
        let icon = document.createElement('i')
        icon.className = 'fa fa-trash trash'
        icon.id = `trash${d._id}`
        todo.appendChild(icon)
        

        
        let node = document.querySelector(`#todo${d._id}`)
        node.addEventListener('click', () => {
            getTodo(d._id)
        })

        let iconBtn = document.querySelector(`#trash${d._id}`)
        iconBtn.addEventListener('click', () => {
            deleteTodo(d._id)
        })

        if(d.complete == true){
            node.style.textDecoration = 'line-through'
        }
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

    console.log(newTodo)

    const rawResponse = await fetch(url, {
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

//get specific todo
const getTodo = (id) => {

    fetch(`${url}/${id}`)
    .then(response => response.json())
    .then(data => {
        console.log(data.complete)
        completeTodo(data)
    })
}

//check off todos
const completeTodo = (data) => {
    let todo = document.querySelector(`#todo${data._id}`)

    if(data.complete == true){
        todo.style.textDecoration = 'none'
        updateComplete(data._id, false)
    }else {
        todo.style.textDecoration = 'line-through'
        updateComplete(data._id, true)
    }
}

//update complete todos
const updateComplete = (id, isComplete) => {
    fetch(`${url}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            complete: isComplete
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .then(json => console.log(json))
}

//delete todo
const deleteTodo = (id) => {
    console.log(0)
    fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .then(json => {
        console.log(json)
        retrieveAll()
    }) 
}

document.querySelector('#hideBtn').addEventListener('click', () => {
    hideTodo()
})

//hide todos 
let btnClickInt = 0
const hideTodo = async () => {
    console.log('hide btn pushed')
    await fetch(url)
    .then(response => response.json())
    .then(data => {
        if(btnClickInt == 0){
            hideTodoFunc(data)
        }
        else{
            showTodoFunc()
        }
        
    }) 
}

//determine to hide todo
hideTodoFunc = (data) => {
    console.log('in hide todo')
    data.forEach(todo => {
        if(todo.complete == true){
            let toHide = document.querySelector(`#todo${todo._id}`)
            toHide.className = 'hideEl'
        }
    })

    btnClickInt = 1

}

//determine to show todo
showTodoFunc = () => {
    console.log('in show todo')
    let showTodo = document.querySelectorAll(".hideEl");
    for (let todo of showTodo) {
        console.log(todo)
        todo.className = 'showEl'
    }

    btnClickInt = 0
}


retrieveAll()