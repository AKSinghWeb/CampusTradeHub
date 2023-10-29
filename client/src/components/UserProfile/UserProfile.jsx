// UserProfile.js (Main Component)
import ProfileHeader from './ProfileHeader'
import ReviewsAndRatings from './ReviewAndRatings'
import UserInfo from './UserInfo'
import UserListings from './UserListings'
import TransactionHistory from './TransactionHistory'
import ContactInformation from './ContactInformation'
import Settings from './Settings'

const UserProfile = () => {
  return (
    <div className="container mx-auto p-4">
      <ProfileHeader />
      <UserInfo />
      <UserListings />
      <ReviewsAndRatings />
      <TransactionHistory />
      <ContactInformation />
      <Settings />
    </div>
  )
}

export default UserProfile
