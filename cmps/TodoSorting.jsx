const { useState, useEffect } = React

export function TodoSorting({ onSortChange, onPageChange, currentSort, currentPage, totalPages, totalItems, pageSize: initialPageSize = 10, onPageSizeChange }) {
    const [sortField, setSortField] = useState((currentSort && currentSort.field) || 'createdAt')
    const [sortDirection, setSortDirection] = useState((currentSort && currentSort.direction) || 'desc')
    const [pageSize, setPageSize] = useState(initialPageSize)

    // Update local state when props change
    useEffect(() => {
        if (currentSort && currentSort.field !== sortField) {
            setSortField(currentSort.field)
        }
        if (currentSort && currentSort.direction !== sortDirection) {
            setSortDirection(currentSort.direction)
        }
    }, [currentSort])

    function handleSortChange(field) {
        const newDirection = field === sortField && sortDirection === 'asc' ? 'desc' : 'asc'
        setSortField(field)
        setSortDirection(newDirection)
        onSortChange({ field, direction: newDirection })
    }

    function handlePageChange(page) {
        onPageChange(page)
    }

    function handlePageSizeChange(newPageSize) {
        setPageSize(newPageSize)
        if (onPageSizeChange) {
            onPageSizeChange(newPageSize)
        }
        onPageChange(1) // Reset to first page when changing page size
    }

    return (
        <section className="todo-sorting">
            <div className="sorting-controls">
                <h3>Sort & Organize</h3>
                <div className="sort-buttons">
                    <span>Sort by: </span>
                    <button 
                        className={`sort-btn ${sortField === 'txt' ? 'active' : ''}`}
                        onClick={() => handleSortChange('txt')}
                    >
                        Text {sortField === 'txt' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </button>
                    <button 
                        className={`sort-btn ${sortField === 'importance' ? 'active' : ''}`}
                        onClick={() => handleSortChange('importance')}
                    >
                        Importance {sortField === 'importance' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </button>
                    <button 
                        className={`sort-btn ${sortField === 'createdAt' ? 'active' : ''}`}
                        onClick={() => handleSortChange('createdAt')}
                    >
                        Date {sortField === 'createdAt' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </button>
                    <button 
                        className={`sort-btn ${sortField === 'isDone' ? 'active' : ''}`}
                        onClick={() => handleSortChange('isDone')}
                    >
                        Status {sortField === 'isDone' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </button>
                </div>
            </div>

            <div className="paging-controls">
                <div className="page-size">
                    <label htmlFor="pageSize">Items per page: </label>
                    <select 
                        id="pageSize" 
                        value={pageSize} 
                        onChange={(e) => handlePageSizeChange(+e.target.value)}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>

                <div className="pagination">
                    <span className="pagination-info">
                        Page {currentPage} of {totalPages} ({totalItems} total items)
                    </span>
                    <div className="pagination-buttons">
                        <button 
                            onClick={() => handlePageChange(1)}
                            disabled={currentPage === 1}
                            className="page-btn"
                        >
                            First
                        </button>
                        <button 
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="page-btn"
                        >
                            Previous
                        </button>
                        <button 
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="page-btn"
                        >
                            Next
                        </button>
                        <button 
                            onClick={() => handlePageChange(totalPages)}
                            disabled={currentPage === totalPages}
                            className="page-btn"
                        >
                            Last
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
