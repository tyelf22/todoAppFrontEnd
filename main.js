//inital data array. DO NOT EDIT OR REMOVE - Use these as the inital app state.
//This is the kind of data you would traditionally get from a data base.
//For now we are just going to mock it.
let initalTodos = [
    {id: 0, todo: "Buy milk.", complete: false, category: "Grocery"},
    {id: 1, todo: "Clean the cat box.", complete: false, category: "House"},
    {id: 2, todo: "Chips and salsa.", complete: false, category: "Grocery"},
    {id: 3, todo: "Finish Homework for DGM 3760", complete: false, category: "School"}
]


let localTodos

console.log(localStorage)


let testArray = [...initalTodos] //copy of initial todos

function withoutStorage(ourArray) {

    let acc = 3 //accumulator for storing id's

    let listTodos = document.querySelector('#listTodos') //ul to place all todos

    let showTodosContainer = document.querySelector('.showTodos')

    let categories = [] //store categories

    //add initial todos to dom
    function addToDom() {
        ourArray.forEach((todo, index) => {
            if(categories.includes(todo.category)){
                let li = document.createElement('li')
                li.setAttribute('id', `tag${todo.id}`)
                li.addEventListener('click', doneTodo)
                let deleteBtn = document.createElement('button')
                deleteBtn.innerText = "Delete"
                deleteBtn.setAttribute('class', 'deleteBtn')
                deleteBtn.setAttribute('id', `deleteBtn${index}`)
                deleteBtn.addEventListener('click', deleteTodo)
                li.innerText = todo.todo
                let ulToAppend = document.querySelector(`.${todo.category}List`)
                ulToAppend.appendChild(li)
                li.appendChild(deleteBtn)
            }else {
                let newDiv = document.createElement('div')
                newDiv.setAttribute('class', `${todo.category}Container`)
                let header = document.createElement('h1')
                header.innerText = todo.category
                showTodosContainer.appendChild(newDiv)
                newDiv.appendChild(header)

                let newUl = document.createElement('ul')
                newUl.setAttribute('class', `${todo.category}List`)
                let li = document.createElement('li')
                li.setAttribute('id', `tag${todo.id}`)
                li.addEventListener('click', doneTodo)
                let deleteBtn = document.createElement('button')
                deleteBtn.innerText = "Delete"
                deleteBtn.setAttribute('class', 'deleteBtn')
                deleteBtn.setAttribute('id', `deleteBtn${index}`)
                deleteBtn.addEventListener('click', deleteTodo)
                li.innerText = todo.todo
                newDiv.appendChild(newUl)
                newUl.appendChild(li)
                li.appendChild(deleteBtn)

                categories.push(todo.category)
            }

        })
    }

    //add single item
    function addSingleItemToDom(obj) {
        if(categories.includes(obj.category)){
            let li = document.createElement('li')
            li.setAttribute('id', `tag${obj.id}`)
            li.addEventListener('click', doneTodo)
            let deleteBtn = document.createElement('button')
            deleteBtn.innerText = "Delete"
            deleteBtn.setAttribute('class', 'deleteBtn')
            deleteBtn.setAttribute('id', `deleteBtn${acc}`)
            deleteBtn.addEventListener('click', deleteTodo)
            li.innerText = obj.todo
            let ulToAppend = document.querySelector(`.${obj.category}List`)
            ulToAppend.appendChild(li)
            li.appendChild(deleteBtn)

            let localTodosSerialized = JSON.stringify(ourArray)
            localStorage.setItem('localTodos', localTodosSerialized)
        }else {
            let newDiv = document.createElement('div')
            newDiv.setAttribute('class', `${obj.category}Container`)
            let header = document.createElement('h1')
            header.innerText = obj.category
            showTodosContainer.appendChild(newDiv)
            newDiv.appendChild(header)

            let newUl = document.createElement('ul')
            newUl.setAttribute('class', `${obj.category}List`)
            let li = document.createElement('li')
            li.setAttribute('id', `tag${obj.id}`)
            li.addEventListener('click', doneTodo)
            let deleteBtn = document.createElement('button')
            deleteBtn.innerText = "Delete"
            deleteBtn.setAttribute('class', 'deleteBtn')
            deleteBtn.setAttribute('id', `deleteBtn${acc}`)
            deleteBtn.addEventListener('click', deleteTodo)
            li.innerText = obj.todo
            newDiv.appendChild(newUl)
            newUl.appendChild(li)
            li.appendChild(deleteBtn)

            categories.push(obj.category)
            let localTodosSerialized = JSON.stringify(ourArray)
            localStorage.setItem('localTodos', localTodosSerialized)
        }
    }


    //ability to add new todos
    let addBtn = document.querySelector('#addBtn')


    addBtn.addEventListener('click', () => {
        let newTodo = document.querySelector('#todoInput').value
        let newCategory = document.querySelector('#categoryInput').value
        // localStorage.setItem('acc', acc++)
        acc++
        newObj = {id: acc, todo: newTodo, complete: false, category: newCategory}
        console.log(newObj)

        ourArray.push(newObj)
        addSingleItemToDom(newObj)
        document.querySelector('#todoInput').value = ''
        document.querySelector('#categoryInput').value = ''
    })

    //ability to cross off todos
    function doneTodo() {
        let nodeId = event.srcElement.id
        let nodeIdSplit = nodeId.split('')
        let nodeIdNum = Number(nodeIdSplit[nodeId.length - 1])
        
        var index = ourArray.map(function(e) { return e.id; }).indexOf(nodeIdNum);

        let el = document.getElementById(nodeId)

        if(ourArray[index].complete == true){
            el.style.textDecoration = 'none'
            ourArray[index].complete = false
        }else {
            el.style.textDecoration = 'line-through'
            ourArray[index].complete = true
        }
        
    }

    //delete single todo
    function deleteTodo() {
        console.log('in delete')
        let nodeId = event.srcElement.id
        let newNodeId = event.srcElement
        let parentNode = newNodeId.parentNode
        parentNodeId = parentNode.id
        parentNodeSplit = parentNodeId.split('')
        parentNodeIdNum = Number(parentNodeSplit[parentNodeId.length - 1])
        console.log(parentNode.id)
        let nodeIdSplit = nodeId.split('')
        let nodeIdNum = Number(nodeIdSplit[nodeId.length - 1])
        console.log('node Num', nodeIdNum)
        let el = document.getElementById(nodeId).parentNode
        

        if(el.parentNode.childNodes.length <= 1){
            let containerNode = el.parentNode.parentNode.childNodes[0].innerText
            let index = categories.indexOf(containerNode)
            categories.splice(index, 1)
            el.parentNode.parentNode.remove()


            items = ourArray.filter(function(item) { 
                return item.id !== parentNodeIdNum; 
              });
            console.log(ourArray)
            window.localStorage.clear();
            let localTodosSerialized = JSON.stringify(items)
            localStorage.setItem('localTodos', localTodosSerialized)
        }else {
            el.remove()

            items = ourArray.filter(function(item) { 
                return item.id !== parentNodeIdNum; 
              });
            console.log(ourArray)
            window.localStorage.clear();
            let localTodosSerialized = JSON.stringify(items)
            localStorage.setItem('localTodos', localTodosSerialized)
        }  
    }

    //Hide Completed Todos
    let hideBtn = document.querySelector('#hideBtn');
    hideBtn.addEventListener('click', hideTodos)

    function hideTodos(){
        console.log(ourArray)
        let doneTodos = ourArray.filter(el => {
            return el.complete == true
        })

        doneTodos.forEach(todo => {
            document.querySelector(`#tag${todo.id}`).style.display = "none";
        })
    }

    addToDom()
}

if(localStorage.getItem("localTodos")){
    console.log('in local todos')
    let unserialized = JSON.parse(localStorage.getItem("localTodos"))
    withoutStorage(unserialized)

}else {
    console.log('in initial todos')
    withoutStorage(testArray, 3)
}

 //call func to add initial items to dom





