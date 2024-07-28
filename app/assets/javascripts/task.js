// Fetch tasks from the board
const fetchTasks = async () => {
    try {
        const response = await fetch(`https://api.trello.com/1/boards/${boardId}/cards?key=${apiKey}&token=${apiToken}`);
        const tasks = await response.json();
        displayTasks(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};

// Display tasks in the DOM
const displayTasks = (tasks) => {
    const tasksContainer = document.getElementById('tasks-container');
    tasksContainer.innerHTML = ''; // Clear previous content

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task'; // Default class with no color
        taskElement.id = task.id; // Set ID for reference
        taskElement.innerHTML = `
            <h3>${task.name}</h3>
            <p>${task.desc}</p>
            <button onclick="moveTask('${task.id}', '${listIds.inProgress}')">Move to In Progress</button>
            <button onclick="moveTask('${task.id}', '${listIds.underReview}')">Move to Under Review</button>
            <button onclick="moveTask('${task.id}', '${listIds.completed}')">Move to Completed</button>
            <span class="status">${getStatusText(task.idList)}</span>
            <div class="timestamp" id="timestamp-${task.id}">Last updated: Not updated yet</div>
        `;
        tasksContainer.appendChild(taskElement);
    });
};

// Determine the class for the task based on its current list ID
const getTaskClass = (listId) => {
    switch (listId) {
        case listIds.inProgress:
            return 'in-progress';
        case listIds.underReview:
            return 'under-review';
        case listIds.completed:
            return 'completed';
        default:
            return '';
    }
};

// Get the status text for a task based on its current list ID
const getStatusText = (listId) => {
    switch (listId) {
        case listIds.inProgress:
            return 'In Progress';
        case listIds.underReview:
            return 'Under Review';
        case listIds.completed:
            return 'Completed';
        default:
            return '<span style="color: blue; font-weight: bold;">Not Started</span>';
    }
};

// Get the current timestamp
const getCurrentTimestamp = () => {
    const now = new Date();
    return now.toLocaleString(); // Format: "7/26/2024, 2:15:30 PM" or similar
};

// Move task to a new list and update the status
const moveTask = async (taskId, listId) => {
    try {
        if (!listId) {
            console.error('List ID is undefined:', listId);
            return;
        }

        // Log the listId for debugging
        console.log('Moving task:', taskId, 'to list:', listId);

        // Move the task to the new list
        const response = await fetch(`https://api.trello.com/1/cards/${taskId}?key=${apiKey}&token=${apiToken}&idList=${listId}`, {
            method: 'PUT'
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Error moving task:', error);
            return;
        }

        const updatedTask = await response.json();
        console.log('Task moved:', updatedTask);

        // Update the task status in the DOM
        updateTaskStatus(taskId, listId);

        // Display the timestamp for this task
        updateTimestamp(taskId, getCurrentTimestamp());

        // Check for dependent tasks and move them if necessary
        await checkAndMoveDependentTasks(taskId);

    } catch (error) {
        console.error('Error moving task:', error);
    }
};

// Update the status of a specific task in the DOM
const updateTaskStatus = (taskId, listId) => {
    const taskElement = document.getElementById(taskId);
    if (taskElement) {
        // Update the task's CSS class to reflect its new status
        taskElement.className = `task ${getTaskClass(listId)}`;
        const statusElement = taskElement.querySelector('.status');
        if (statusElement) {
            statusElement.textContent = getStatusText(listId);
        }
    } else {
        console.error('Task element not found:', taskId);
    }
};

// Update the timestamp for a specific task in the DOM
const updateTimestamp = (taskId, timestamp) => {
    const timestampElement = document.getElementById(`timestamp-${taskId}`);
    if (timestampElement) {
        timestampElement.textContent = `Last updated: ${timestamp}`;
    } else {
        console.error('Timestamp element not found:', taskId);
    }
};

// Check for tasks that depend on the moved task and move them
const checkAndMoveDependentTasks = async (taskId) => {
    try {
        const response = await fetch(`https://api.trello.com/1/boards/${boardId}/cards?key=${apiKey}&token=${apiToken}`);
        const tasks = await response.json();
        
        // Find dependent tasks (tasks whose description includes the task ID)
        const dependentTasks = tasks.filter(task => task.desc.includes(`depends on ${taskId}`));
        
        // Move each dependent task to the 'In Progress' list
        for (const task of dependentTasks) {
            await moveTask(task.id, listIds.inProgress);
        }
    } catch (error) {
        console.error('Error checking or moving dependent tasks:', error);
    }
};

// Fetch and display tasks on page load
fetchTasks();

