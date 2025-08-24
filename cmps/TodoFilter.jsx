const { useState, useEffect, useCallback } = React

export function TodoFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})
    const [debouncedTxt, setDebouncedTxt] = useState(filterBy.txt)

    // Debounce function for text input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTxt(filterByToEdit.txt)
        }, 300) // 300ms delay

        return () => clearTimeout(timer)
    }, [filterByToEdit.txt])

    // Update filter when debounced text changes
    useEffect(() => {
        if (debouncedTxt !== filterBy.txt) {
            onSetFilterBy({ ...filterByToEdit, txt: debouncedTxt })
        }
    }, [debouncedTxt])

    // Update local state when parent filter changes
    useEffect(() => {
        setFilterByToEdit(filterBy)
    }, [filterBy])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default: break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    // Optional support for LAZY Filtering with a button
    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt, importance, isDone } = filterByToEdit
    return (
        <section className="todo-filter">
            <h2>Filter Todos</h2>
            <form onSubmit={onSubmitFilter}>
                <input value={txt} onChange={handleChange}
                    type="search" placeholder="By Txt" id="txt" name="txt"
                />
                <label htmlFor="importance">Importance: </label>
                <input value={importance} onChange={handleChange}
                    type="number" placeholder="By Importance" id="importance" name="importance"
                />
                <label htmlFor="isDone">Status: </label>
                <select value={isDone} onChange={handleChange} name="isDone" id="isDone">
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="done">Done</option>
                </select>

                <button hidden>Set Filter</button>
            </form>
        </section>
    )
}