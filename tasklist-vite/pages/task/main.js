import "./style.css";

let tasks = []; // task variable -> state

 export default function Task() {
    return{

        render(){
            
            return `
                <h1>Tasks</h1>

                <input id="taskInput" placeholder="Enter Task detail" />
                <button id="addBtn">Add</button>


                <select name="filter" id="filter">
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                </select>

                <ul id="taskList"></ul>

                <p id="summary"></p>  `;

        },

        mount(){

        const input = document.getElementById('taskInput');
        const addBtn = document.getElementById('addBtn');
        const taskList = document.getElementById('taskList');
        const summary = document.getElementById('summary');
        const filter = document.getElementById('filter');

        function renderTasks(tasks){

            taskList.innerHTML = '';
            tasks.forEach((task, index) => {
                const li = document.createElement('li');
                
                li.textContent = task.text;
                li.style.textDecoration = task.done ? 'line-through' : 'none';
                li.style.cursor = 'pointer';
                li.className = task.done ? 'task-completed' : 'task-notcompleted';
                
                li.addEventListener('click',() => {
                    tasks[index].done = !tasks[index].done;
                    renderTasks(tasks);
                })
                
                taskList.appendChild(li);
            })

            renderSummary();

        }

        function renderSummary(){

            const completedTasks = tasks.filter(task => task.done).length;
            summary.textContent = `Completed ${completedTasks} out of ${tasks.length} tasks.`;

        }

        addBtn.addEventListener('click',() => {
            if(input.value.trim() === '') return;
            tasks.push({text: input.value, done: false});
            input.value = '';
            renderTasks(tasks);

        })


        function applyFilter(filteredTasks, filterType){
            // Filtering logic to be implemented
            // console.log(filteredTasks);

            if(filteredTasks.length === 0){
                taskList.innerHTML = 'No tasks found.';
                return;
            }

            taskList.innerHTML = '';
            filteredTasks.forEach((task, index) => {
                const li = document.createElement('li');
                
                li.textContent = task.text;
                li.style.textDecoration = task.done ? 'line-through' : 'none';
                li.style.cursor = 'pointer';
                li.className = task.done ? 'task-completed' : 'task-notcompleted';
                
                li.addEventListener('click',() => {
                    const originalIndex = tasks.indexOf(task);
                    tasks[originalIndex].done = !tasks[originalIndex].done;
                    filterType === 'completed' ? applyFilter(tasks.filter(t => t.done), 'completed') :
                    applyFilter(tasks.filter(t => !t.done), 'pending');
                    //renderTasks(tasks);
                })
                
                taskList.appendChild(li);
            })
        }

        filter.addEventListener('change', () => {
            // console.log(filter.value);
            
            if(filter.value === 'all'){
                renderTasks(tasks);
            } else if(filter.value === 'completed'){
                const completedTasks = tasks.filter(task => task.done);
                applyFilter(completedTasks, 'completed');
            } else if(filter.value === 'pending'){
                const pendingTasks = tasks.filter(task => !task.done);
                applyFilter(pendingTasks, 'pending');
            }
        });

        renderTasks(tasks);

        }
    }

}
