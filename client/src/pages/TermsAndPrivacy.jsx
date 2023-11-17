import { Link } from 'react-router-dom'

const TermsAndPrivacy = () => {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto p-8 rounded shadow border dark:bg-slate-900 dark:shadow-slate-800">
        <h1 className="text-3xl font-semibold mb-6">
          Terms of Service and Privacy Policy
        </h1>
        <p className="mb-8">
          {
            'Welcome to CampusTradeHub, the online marketplace for buying and selling within your campus community. Please read these Terms of Service ("Terms") and Privacy Policy carefully before using our platform.'
          }
        </p>
        <p className="mb-8">
          {
            'CampusTradeHub is committed to protecting your privacy. This Privacy Policy outlines our practices regarding the collection, use, and disclosure of your personal information.'
          }
        </p>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="">
            {
              'By accessing or using CampusTradeHub ("the Platform"), you agree to comply with and be bound by these Terms. If you do not agree with any part of the Terms, you may not access the Platform.'
            }
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            2. User Registration and Accounts
          </h2>
          <p className="">
            {
              'You are responsible for maintaining the confidentiality of your account credentials. Any activities that occur under your account are your responsibility.'
            }
          </p>
          <p className="mt-4">
            {
              'You agree to provide accurate and complete information during the registration process. CampusTradeHub reserves the right to suspend or terminate accounts with inaccurate information'
            }
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            3. Listing and Transactions
          </h2>
          <p className="">
            {
              'All product listings are subject to approval by CampusTradeHub administrators. We strive to maintain the quality of listings on our platform.'
            }
          </p>
          <p className="mt-4">
            {
              'Users are expected to conduct transactions with integrity and honesty. Any fraudulent or deceptive activities will result in immediate account suspension.'
            }
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            4. Information We Collect
          </h2>

          <p className="">
            {
              ' We collect information provided during the registration process, including but not limited to, usernames, email addresses, and contact details.'
            }
          </p>
          <p className="mt-4">
            {
              'Details provided in product listings, such as titles, descriptions, images, and prices.'
            }
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            5. How We Use Your Information
          </h2>
          <p className="">
            {
              'Information is used to provide you with the services offered on CampusTradeHub, including facilitating transactions and communication between users.'
            }
          </p>
          <p className="mt-4">
            {
              'We may use your contact information to send important notifications related to your account and transactions.'
            }
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            6. Sharing of Information
          </h2>
          <p className="">
            {
              'Approved listings, including their details, may be visible to all registered users.'
            }
          </p>
          <p className="mt-4">
            {
              'We may disclose your information if required by law or in response to valid requests.'
            }
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">7. Security</h2>
          <p className="">
            {
              'We implement industry-standard security measures to protect your data. However, no method of transmission over the internet or electronic storage is 100% secure.'
            }
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">8. User Conduct</h2>
          <p className="">
            {
              'Users must not engage in activities that violate any laws, infringe on intellectual property rights, or harm the integrity of the platform. This includes but is not limited to spamming, hacking, or spreading malware.'
            }
          </p>
          <p className="mt-4">
            {
              'Users are solely responsible for the content they post on CampusTradeHub. Any content that violates these Terms may be removed, and the user may face account suspension.'
            }
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            9. Intellectual Property
          </h2>
          <p className="">
            {
              'CampusTradeHub retains ownership of the platform, including all intellectual property rights. Users may not reproduce, modify, distribute, or create derivative works from any part of the platform without explicit permission.'
            }
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">10. Feedback</h2>
          <p className="">
            {
              'We appreciate user feedback to enhance our platform. By submitting suggestions, ideas, or feedback, you grant CampusTradeHub the right to use, modify, and implement them without any obligation or compensation.'
            }
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            11. Termination of Service
          </h2>
          <p className="">
            {
              'CampusTradeHub reserves the right to suspend or terminate your access to the platform at any time for violations of these Terms or for any other reason deemed necessary by the administrators.'
            }
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            12. Limitation of Liability
          </h2>
          <p className="">
            {
              'CampusTradeHub is not liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the platform, including damages for loss of profits, goodwill, use, data, or other intangible losses.'
            }
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            13. Changes to Terms and Privacy Policy
          </h2>
          <p className="">
            {
              'CampusTradeHub reserves the right to update and change the Terms of Service and Privacy Policy.'
            }
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            14. Contact Information
          </h2>
          <p className="">
            {
              'If you have any questions or concerns about these Terms of Service or the Privacy Policy, please contact us '
            }
            <Link to={'/contact'}>
              <span className="text-blue-500">{'here.'}</span>
            </Link>
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Thank you for being a part of the CampusTradeHub community! 🚀🛍️
          </h2>
        </section>
      </div>
    </div>
  )
}

export default TermsAndPrivacy
