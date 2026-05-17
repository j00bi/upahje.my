interface JobCardProps {
  title: string
  category: string
  location: string
  budget: string
  status: string
  postedDate: string
  onView?: () => void
}

export function JobCard({
  title,
  category,
  location,
  budget,
  status,
  postedDate,
  onView,
}: JobCardProps) {
  return (
    <div className="border rounded-xl p-5 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-2">
        <div className="font-semibold text-lg">{title}</div>
        <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
          {status}
        </span>
      </div>

      <div className="text-sm text-gray-600 mb-3">
        {category} • {location}
      </div>

      <div className="flex justify-between items-end">
        <div>
          <div className="text-xs text-gray-500">Budget</div>
          <div className="font-medium">{budget}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">Posted</div>
          <div className="text-sm">{postedDate}</div>
        </div>
      </div>

      <button
        onClick={onView}
        className="mt-4 w-full border border-gray-300 hover:bg-gray-50 py-2 rounded-lg text-sm font-medium transition"
      >
        View Details
      </button>
    </div>
  )
}
