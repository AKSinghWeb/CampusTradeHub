import { ArrowLeft, ArrowRight } from 'lucide-react'

const Pagination = ({
  productsPerPage,
  totalProducts,
  currentPage,
  paginate,
  pageRange = 3, // Number of visible page numbers on each side of the current page
}) => {
  const pageNumbers = []
  const totalPages = Math.ceil(totalProducts / productsPerPage)

  const calculatePageRange = () => {
    let startPage = currentPage - pageRange
    let endPage = currentPage + pageRange

    // Adjust start and end if they go beyond the total number of pages
    if (startPage < 1) {
      startPage = 1
      endPage = Math.min(pageRange * 2 + 1, totalPages)
    }

    if (endPage > totalPages) {
      endPage = totalPages
      startPage = Math.max(totalPages - pageRange * 2, 1)
    }

    return { startPage, endPage }
  }

  const { startPage, endPage } = calculatePageRange()

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }

  return (
    <nav
      className="mt-14 flex justify-center items-center"
      aria-label="Page navigation"
    >
      <ul className="flex items-center -space-x-px h-8 text-sm">
        {currentPage > 1 && (
          <li>
            <button
              onClick={() => paginate(currentPage - 1)}
              className="flex mx-1 items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </li>
        )}

        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`flex items-center justify-center px-3 h-8 leading-tight ${
                currentPage === number
                  ? 'text-white rounded-sm mx-1 bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600'
                  : 'text-gray-500 rounded-sm mx-1 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              }`}
            >
              {number}
            </button>
          </li>
        ))}

        {currentPage < totalPages && (
          <li>
            <button
              onClick={() => paginate(currentPage + 1)}
              className="flex mx-1 items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Pagination
