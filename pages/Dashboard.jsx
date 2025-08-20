const { useEffect, useState } = React
import {Chart} from '../cmps/Chart.jsx'
import { useStore } from '../services/useStore.js'
import { todoService } from '../services/todo.service.js'

export function Dashboard() {

    const { todos } = useStore()
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