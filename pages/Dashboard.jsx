const { useEffect, useState } = React
import {Chart} from '../cmps/Chart.jsx'
import { todoService } from '../services/todo.service.js'
const { useSelector } = ReactRedux

export function Dashboard() {

    const todos = useSelector(storeState => storeState.todos)
    const [importanceStats, setImportanceStats] = useState([])

    useEffect(()=>{
        todoService.getImportanceStats()
            .then(setImportanceStats)
    }, [])


    return (
        <section className="dashboard">
            <h1>Dashboard</h1>
            <h2>Statistics for {todos.length} Todos</h2>
            <hr />
            <h4>By Importance</h4>
            <Chart data={importanceStats}/>
        </section>
    )
}