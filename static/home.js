document.querySelector('#formTask').addEventListener('submit', saveButton);

//FUNCION PARA GUARDAR TAREAS EN LOCAL STORAGE
function saveButton (e) {
    let title = document.querySelector('#title').value;
    let description = document.querySelector('#description').value;

    const task = { //otra forma de escribir un objeto en javascript
        title,
        description
    };

    //LO QUE VOY A UTILIZAR ES EL  API del navegador para guardar datos en la memoria del Navegador para lo cual uso 
    
    //este setItem es para guardar datos
    // localStorage.setItem ('tasks', JSON.stringify(task)); //le debo dar el nombre del archivo que debe almcear datos en este caso tasks y le doy lo que deseo guardar en este casoe l objeto task sin embargo prefiero guargarlo como string por lo que usara el metod JSON.stringify para transformarlo en string
    
    //getItem lo uso para obtener datos
   // JSON.parse(localStorage.getItem('tasks')); //JSON.parse convierte string en objeto

   //Creo mi funcion if
   if (localStorage.getItem('tasks') === null) {
       let tasks = [];
       tasks.push(task);
       localStorage.setItem('tasks', JSON.stringify(tasks));
   } else {
       let tasks = JSON.parse(localStorage.getItem('tasks'));
       tasks.push(task);
       localStorage.setItem('tasks', JSON.stringify(tasks));
   }

   getTask(); //listo la tarea nueva
   
   //reseteo el formulario para que no queden los valores anteriores
   document.querySelector('#formTask').reset();

    e.preventDefault(); //prevengo el comportamiento por defecto de que el formulario actualice la pagina quedando los datos

}

// FUNCION PARA LISTAR TAREAS
function getTask () {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let taskView = document.querySelector('#tasks')
    taskView.innerHTML = ''; //limpio de ocntenido mi div en caso tenga datos

    for (i=0; i < tasks.length; i++) { //agrego el += para que se vayan añadiend una a una las tareas
        taskView.innerHTML += `<div class="card mb-3">
        <div class="card-body">
        <p>${tasks[i]['title']} - ${tasks[i]['description']}</p>
        <a class="btn btn-danger btn-sm" onclick="deleteTask('${tasks[i]['title']}')">&times;</a>
        </div>

        </div>`
    }
}

// FUNCION DELETE TASK
function deleteTask (title) {
    let tasks = JSON.parse(localStorage.getItem('tasks')); //obtengo tareas en forato objeto
    //esto hago para eliminar una tarea
    for (i=0; i < tasks.length; i++) {
        if (tasks[i]['title'] == title) {
            tasks.splice(i, 1); //el splice es separar le digo que quite de la lista el valor de orden i y quite un solo valorde la lista
        }
    }

    //vuelvo a guardar las tareas en string
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTask(); //lo hago para obtener esa lista actualizada
}


getTask();