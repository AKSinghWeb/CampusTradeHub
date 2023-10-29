// UserListings.js

const UserListings = () => {
  // Replace this with actual listing data
  const listings = [
    {
      id: 1,
      title: 'Laptop',
      description: 'Great condition laptop for sale',
      price: '$800',
      imageUrl: 'https://placekitten.com/200/200', // Replace with actual image URL
    },
    {
      id: 2,
      title: 'Smartphone',
      description: 'Brand new smartphone, unopened box',
      price: '$500',
      imageUrl: 'https://placekitten.com/201/201', // Replace with actual image URL
    },
  ]

  return (
    <div className="bg-white p-8 mb-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Recent Listings</h2>
      {listings.map((listing) => (
        <div key={listing.id} className="mb-4 border-b pb-4">
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="w-20 h-20 object-cover rounded-lg mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold">{listing.title}</h3>
            <p className="text-gray-500">{listing.description}</p>
            <p className="text-blue-500 font-bold mt-2">{listing.price}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UserListings
