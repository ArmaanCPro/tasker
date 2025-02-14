<script lang="ts" context="module">
    export const ssr = false;
</script>


<script lang="ts">
    import { tasks } from '$lib/stores/tasks';
    import type { Task } from '$lib/types/task'; // Import the Task type

    let newTask: string = ''; // Typed as a string

    // Add a new task
    const addTask = (): void => {
        if (newTask.trim()) {
            tasks.update((currentTasks: Task[]) => [
                ...currentTasks,
                { id: Date.now(), text: newTask, completed: false }
            ]);
            newTask = ''; // Reset input after adding task
        }
    };

    // Toggle task completion
    const toggleTask = (id: number): void => {
        tasks.update((currentTasks: Task[]) =>
            currentTasks.map((task: Task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    // Remove a task
    const deleteTask = (id: number): void => {
        tasks.update((currentTasks: Task[]) =>
            currentTasks.filter((task: Task) => task.id !== id)
        );
    };
</script>

<main class="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
    <div class="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
        <h1 class="text-2xl font-bold mb-4 text-center">Task Manager</h1>

        <!-- Input for new task -->
        <form on:submit|preventDefault={addTask} class="flex mb-4">
            <input
                    type="text"
                    bind:value={newTask}
                    placeholder="Add a new task"
                    class="flex-grow p-2 border border-gray-300 rounded-l"
            />
            <button type="submit" class="p-2 bg-blue-500 text-white rounded-r hover:bg-blue-600">
                Add
            </button>
        </form>

        <!-- Task List -->
        <ul>
            {#each $tasks as task (task.id)}
                <li class="flex justify-between items-center p-2 border-b border-gray-300">
                    <span class={task.completed ? 'line-through text-gray-400' : ''}>
                        {task.text}
                    </span>
                    <div>
                        <button on:click={() => toggleTask(task.id)} class="mr-2 text-blue-500 hover:text-blue-700">
                            {task.completed ? 'Undo' : 'Complete'}
                        </button>
                        <button on:click={() => deleteTask(task.id)} class="text-red-500 hover:text-red-700">
                            Delete
                        </button>
                    </div>
                </li>
            {/each}
        </ul>
    </div>
</main>