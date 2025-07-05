document.addEventListener('DOMContentLoaded', () => {
    const inputtask = document.getElementById('inputtask');
    const addtaskbtn = document.getElementById('addtaskbtn');
    const tasklist = document.getElementById('tasklist');
    const taskform = document.getElementById('taskform')

    taskform.addEventListener('submit', function submit(e) {
        e.preventDefault();
        addtask();
    });


    addtaskbtn.addEventListener('click', function submit() {
        addtask();
    });


    function addtask() {
        const taskinputed = inputtask.value;
        if (taskinputed === '') {
            
            return;
        }
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        
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
            }
        })
        
        const delbtn = document.createElement('button');
        delbtn.textContent = "delete";
        li.appendChild(delbtn);
        delbtn.addEventListener('click', function del () {
            li.remove();
        });
        
        checkbox.addEventListener('change', function checkbox() {
            if (checkbox.checked) {
                li.classList.add('completed');
            } else {
                li.classList.remove('completed');
            }
        });
        
        tasklist.appendChild(li);
        inputtask.value = "";
    }
})