const TransactionHistory = () => {
  // Replace this with actual transaction data
  const transactions = [
    {
      id: 1,
      item: 'Laptop',
      date: '2023-01-15',
      status: 'Completed',
    },
    {
      id: 2,
      item: 'Smartphone',
      date: '2023-02-10',
      status: 'Sold',
    },
  ]

  return (
    <div className="bg-white p-8 mb-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
      {transactions.map((transaction) => (
        <div key={transaction.id} className="mb-4">
          <div className="flex items-center mb-2">
            <p className="text-lg font-semibold mr-2">{transaction.item}</p>
            <p className="text-gray-500">{transaction.date}</p>
          </div>
          <p
            className={`text-${
              transaction.status === 'Completed' ? 'green' : 'blue'
            }-500 font-bold mb-2`}
          >
            {transaction.status}
          </p>
        </div>
      ))}
    </div>
  )
}

export default TransactionHistory
