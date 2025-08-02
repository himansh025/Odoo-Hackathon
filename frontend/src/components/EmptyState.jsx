function EmptyState({ filtersActive, clearFilters }) {
  return (
    <div className="bg-white p-8 rounded-lg shadow text-center">
      <p className="text-gray-500">
        {filtersActive ? 'No tickets match your current filters.' : 'No tickets found.'}
      </p>
      {filtersActive && (
        <button onClick={clearFilters} className="mt-2 text-blue-600 hover:text-blue-800">
          Clear filters to see all tickets
        </button>
      )}
    </div>
  )
}

export default EmptyState
