jQuery(function () {

    scrollUp();
    fetchTasks();
    displayProfileDetails();

    function scrollUp() {
        $('.scroll-up-btn').on("click", function () {
            $('html').animate({ scrollTop: 0 });
            $('html').css("scrollBehavior", "auto");
        });
    }

    // trigger modal
    $('.modal').modal({
        dismissible: false,
        preventScrolling: true
    });

    // skills carousel
    $('.carousel').carousel();

    // Fetch profile details and display them in the UI
    async function displayProfileDetails() {
        try {
            const response = await fetch('/api/profiles');
            if (!response.ok) {
                throw new Error('Failed to profile details');
            }
            const profiles = await response.json();
            const profile = profiles[0];
            document.getElementById('name').textContent = profile.name;
            document.getElementById('studentID').textContent = profile.studentID;

        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    }

    // Fetch tasks and display them in the UI
    async function fetchTasks() {
        try {
            const response = await fetch('/api/tasks');
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const tasks = await response.json();
            displayTasks(tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }

    // Display tasks in the list
    function displayTasks(tasks) {
        const taskList = document.getElementById('task-lists');
        taskList.innerHTML = '';

        if (tasks.length !== 0) {
            // If tasks are available, loop through and display them
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.className = 'task-list';

                const title = document.createElement('h3');
                title.className = 'task-list__title';
                title.textContent = `${task.title} : `;

                const description = document.createElement('p');
                description.className = 'task-list__description';
                description.textContent = task.description;

                li.appendChild(title);
                li.appendChild(description);

                // Add a delete button
                const deleteButton = document.createElement('button');
                deleteButton.className = 'btn_delete';
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => deleteTask(task._id));

                li.appendChild(deleteButton);
                taskList.appendChild(li);
            });
        } else {
            // If no tasks are available, display a message
            const noTasksMessage = document.createElement('li');
            noTasksMessage.className = 'task_lists__none';
            noTasksMessage.textContent = 'No tasks available';
            taskList.appendChild(noTasksMessage);
        }
    }

    // Add a new task
    async function addTask(event) {
        event.preventDefault();

        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-description').value;

        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description }),
            });

            if (!response.ok) {
                throw new Error('Failed to add task');
            }

            alert('Task added successfully');

            // window.location.reload();
            fetchTasks()
            document.getElementById('task-title').value = '';
            document.getElementById('task-description').value = '';

        } catch (error) {
            console.error('Error adding task:', error);
        }
    }

    // Delete a task
    async function deleteTask(id) {
        try {
            const response = await fetch(`/api/task/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Failed to delete task');
            }

            // reload the task list
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }

    // socket
    const socket = io();
    const messagesContainer = document.getElementById('messages');
    const userInput = document.getElementById('user');
    const messageInput = document.getElementById('message');
    const sendMessageBtn = document.getElementById('sendMessageBtn');

    // Emit 'join' event to receive previous messages when the user joins
    socket.emit('join');

    // Listen for 'previousMessages' from the server to display old messages
    socket.on('previousMessages', (messages) => {
        messages.forEach((msg) => {
            displayMessage(msg);
        });
    });

    // Listen for new messages
    socket.on('chatMessage', (message) => {
        displayMessage(message);
    });

    // Send a message when the "Send" button is clicked
    function sendMessage() {
        const user = userInput.value;
        const text = messageInput.value;

        if (user && text) {
            // Emit the 'chatMessage' event with the user's name and message text
            socket.emit('chatMessage', { user, text });

            // Optionally, display the sent message immediately
            displayMessage({ user, text });

            // Clear the message input field
            messageInput.value = '';
        }
    }

    // Function to display messages in the UI
    function displayMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${message.user}: ${message.text}`;
        messagesContainer.appendChild(messageElement);

        // Scroll to the bottom to always show the latest message
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    sendMessageBtn.addEventListener('click', sendMessage);
    document.getElementById('task-form').addEventListener('submit', addTask);
});
