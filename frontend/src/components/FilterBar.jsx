import { MagnifyingGlassIcon, PlusCircleIcon } from '@heroicons/react/24/outline'

function FilterBar({
  categories,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  searchTerm,
  setSearchTerm,
  clearFilters,
  handleAsk
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-wrap gap-4 mb-4">
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="p-2 border border-gray-300 rounded-lg">
          <option value="">All Categories</option>
          {categories?.map(cat => (
            <option key={cat._id} value={cat.name}>{cat.name}</option>
          ))}
        </select>

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="p-2 border border-gray-300 rounded-lg">
          <option value="">All Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="p-2 border border-gray-300 rounded-lg">
          <option value="mostComment">Most comment</option>
          <option value="mostUpvote">Most upvote</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>

        <button onClick={clearFilters} className="px-3 py-2 bg-gray-200 rounded-lg">Clear Filters</button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border border-gray-300 rounded-lg"
            placeholder="Search tickets..."
          />
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-600 absolute left-3 top-2.5" />
        </div>
        <button onClick={handleAsk} className="bg-green-500 text-white p-2 rounded-lg flex items-center">
          <PlusCircleIcon className="h-5 w-5 mr-1" /> Ask
        </button>
      </div>
    </div>
  )
}

export default FilterBar
