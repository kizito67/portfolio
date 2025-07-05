document.addEventListener('DOMContentLoaded', () => {
    const inputtask = document.getElementById('inputtask');
    const addtaskbtn = document.getElementById('addtaskbtn');
    const tasklist = document.getElementById('tasklist');
    const taskform = document.getElementById('taskform')

     const saved = JSON.parse(localStorage.getItem('tasks')) || [];
    saved.forEach(task => createTask(task.text, task.completed));

    taskform.addEventListener('submit', function submit(e) {
        e.preventDefault();
        addtask();
    });


    addtaskbtn.addEventListener('click', function submit() {
        addtask();
    });



    function saveTasks() {
        const allTasks = [];
        tasklist.querySelectorAll('li').forEach(li => {
            const label = li.querySelector('label');
            const checkbox = li.querySelector('input[type="checkbox"]');
            allTasks.push({ text: label.textContent, completed: checkbox.checked });
        });
        localStorage.setItem('tasks', JSON.stringify(allTasks));
    }

    
    function createTask(taskinputed, completed = false) {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.checked = completed;

        
        const label = document.createElement('label');
        label.textContent = taskinputed;
        
        li.appendChild(checkbox);
        li.appendChild(label);
        
        const editbtn = document.createElement('button')
        editbtn.textContent = "edit"
        editbtn.classList.add("edit")
        li.appendChild(editbtn)

        editbtn.addEventListener('click', function edittask() {
            const newtasktext = prompt("Edit your task:", label.textContent);
            if (newtasktext !== null && newtasktext.trim() !== "") {
                label.textContent = newtasktext.trim();
                saveTasks();
            }
        })
        
        const delbtn = document.createElement('button');
        delbtn.textContent = "delete";
        li.appendChild(delbtn);
        
        delbtn.addEventListener('click', function del () {
            li.remove();
            saveTasks();
        });
        
        checkbox.addEventListener('change', function checkbox() {
            if (checkbox.checked) {
                li.classList.add('completed');
            } else {
                li.classList.remove('completed');
            }
            saveTasks();
        });
        if (completed) {
            li.classList.add('completed')
        }
        
        tasklist.appendChild(li);

    }
        function addtask() {
        const taskinputed = inputtask.value.trim();
        if (taskinputed === '') return;

        createTask(taskinputed);
        saveTasks(); 
        inputtask.value = "";
    }
})