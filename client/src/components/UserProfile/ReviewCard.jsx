import { Star } from 'lucide-react'

const ReviewCard = () => {
  return (
    <article>
      <div className="flex items-center mb-4 space-x-4">
        <img
          className="w-10 h-10 rounded-full"
          src="/docs/images/people/profile-picture-5.jpg"
          alt=""
        />
        <div className="space-y-1 font-medium dark:text-white">
          <p>
            Jese Leos{' '}
            <time
              dateTime="2014-08-16 19:00"
              className="block text-sm text-gray-500 dark:text-gray-400"
            >
              Joined on August 2014
            </time>
          </p>
        </div>
      </div>
      <div className="flex items-center mb-1">
        {[...Array(4)].map((_, index) => (
          <Star key={index} size={18} className="text-yellow-300 mr-1" />
        ))}
        <Star size={18} className="text-gray-300 dark:text-gray-500 mr-1" />
        <h3 className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
          Thinking to buy another one!
        </h3>
      </div>
      <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
        <p>
          Reviewed in the United Kingdom on{' '}
          <time dateTime="2017-03-03 19:00">March 3, 2017</time>
        </p>
      </footer>
      <p className="mb-2 text-gray-500 dark:text-gray-400">
        This is my third Invicta Pro Diver. They are just fantastic value for
        money. This one arrived yesterday and the first thing I did was set the
        time, popped on an identical strap from another Invicta and went in the
        shower with it to test the waterproofing.... No problems.
      </p>
      <p className="mb-3 text-gray-500 dark:text-gray-400">
        It is obviously not the same build quality as those very expensive
        watches. But that is like comparing a Citroën to a Ferrari. This watch
        was well under £100! An absolute bargain.
      </p>
      <a
        href="#"
        className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
      >
        Read more
      </a>
      <aside>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          19 people found this helpful
        </p>
        <div className="flex items-center mt-3 space-x-3 divide-x divide-gray-200 dark:divide-gray-600">
          <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            Helpful
          </button>
          <a
            href="#"
            className="pl-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Report abuse
          </a>
        </div>
      </aside>
    </article>
  )
}

export default ReviewCard
