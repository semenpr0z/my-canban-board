import {TaskContext} from "./task-context";
import {useEffect, useState} from "react";

export const TaskProvider = (props) => {
    const [tasks, setTasks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [idCounter, setIdCounter] = useState(0);

    const [states] = useState([
        {id: 1, name: 'Backlog', state: 'backlog'},
        {id: 2, name: 'Ready', state: 'ready'},
        {id: 3, name: 'In progress', state: 'inProgress'},
        {id: 4, name: 'Finished', state: 'finished'}
    ]);

    const findById = (id) => tasks.find((task) => task.id === parseInt(id));


    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('tasks', JSON.stringify(tasks))
        }
    }, [tasks, isLoaded])

    useEffect(() => {
        const tasks = localStorage.getItem('tasks');
        if (tasks) {
            setTasks(JSON.parse(tasks))
        }
        setIsLoaded(true);
    }, [])

    const context = {
        states,
        addTask: (name) => {
            if(name){
            const id = idCounter + 1;
            const task = {
                id,
                name,
                state: 'backlog',
                description: 'This task has no description'
            }

            setIdCounter(id);
            setTasks([...tasks, task])}
        },
        updateTask: (item) => {
            const task = findById(item.id);
            task.name = item.name;
            task.description = item.description;
            setTasks([...tasks])
        },
        removeTask: (id) => {
            const task = findById(id);
            if (task) {
                setTasks([...tasks.filter(item => item.id !== task.id)])
            }
        },
        getTaskById: findById,
        getTasksByState: (state) => {
            return tasks.filter(task => task.state === state);
        },
        getTasksByExcludedState: (state) => {
            return tasks.filter(task => task.state !== state);
        },
        getTasksInPreviousState: (state) => {
            console.log()
            return tasks.filter(task => task.state === states[states.find(s => s.state === state)?.id - 2].state)
        },
        getInfoAboutPreviousState: (state) => {
            if(state === 'backlog'){
                return false
            }else{
            if(tasks.filter(task => task.state === states[states.find(s => s.state === state)?.id - 2].state).length > 0){
                return false}
                else{
                return true
            }}
        },
        moveTask: (id, state) => {
            const task = findById(id);
            if (task) {
                task.state = state;
            }
            setTasks([...tasks]);
        },
        getActiveTaskCount: () =>
            tasks.filter(task => task.state === 'backlog').length,
        getFinishedTaskCount: () =>
            tasks.filter(task => task.state === 'finished').length,
    }

    return <TaskContext.Provider value={context}>{isLoaded && props.children}</TaskContext.Provider>
}
