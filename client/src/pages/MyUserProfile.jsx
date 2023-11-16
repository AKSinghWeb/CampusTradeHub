// UserProfile.js (Main Component)
import ProfileHeader from '../components/UserProfile/ProfileHeader'
import UserSettings from '../components/UserProfile/Settings'
import UserInfo from '../components/UserProfile/UserInfo'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import UserListings from '../components/UserProfile/UserListings'
import { useParams } from 'react-router-dom'
import MyReviews from '../components/UserProfile/MyReviews'

const MyUserProfile = () => {
  const { tab } = useParams()

  const handleTabListClick = (value) => {
    const url = `/user/${value}`
    window.history.pushState({}, '', url)
  }

  return (
    <Tabs
      onValueChange={handleTabListClick}
      defaultValue={tab ? tab : 'profile'}
      orientation="vertical"
    >
      <div className="flex flex-col lg:flex-row min-h-screen ">
        {/* Left side with tabs */}
        <div className="lg:w-1/6 lg:border flex max-md:justify-center">
          <TabsList className="h-fit mx-4 bg-transparent lg:w-full flex justify-stretch overflow-x-auto lg:flex-col mt-8 max-md:my-6">
            <TabsTrigger
              key={1}
              value="profile"
              className="px-4 my-1 py-2 cursor-pointer w-full text-left hover:bg-gray-100 data-[state=active]:border whitespace-nowrap data-[state=active]:bg-gray-50 dark:data-[state=active]:bg-gray-800 dark:hover:bg-gray-800 data-[state=active]:text-foreground data-[state=active]:shadow "
            >
              <span className="w-full text-left">My Profile</span>
            </TabsTrigger>
            <TabsTrigger
              key={2}
              value="settings"
              className="px-4 my-1 py-2 cursor-pointer w-full text-left hover:bg-gray-100 data-[state=active]:border whitespace-nowrap data-[state=active]:bg-gray-50 dark:data-[state=active]:bg-gray-800 dark:hover:bg-gray-800 data-[state=active]:text-foreground data-[state=active]:shadow "
            >
              <span className="w-full text-left">Settings</span>
            </TabsTrigger>
            <TabsTrigger
              key={3}
              value="my-postings"
              className="px-4 my-1 py-2 cursor-pointer w-full text-left hover:bg-gray-100 data-[state=active]:border whitespace-nowrap data-[state=active]:bg-gray-50 dark:data-[state=active]:bg-gray-800 dark:hover:bg-gray-800 data-[state=active]:text-foreground data-[state=active]:shadow "
            >
              <span className="w-full text-left">My Posts</span>
            </TabsTrigger>
            <TabsTrigger
              key={4}
              value="reviewsAndRatings"
              className="px-4 my-1 py-2 cursor-pointer w-full text-left hover:bg-gray-100 data-[state=active]:border whitespace-nowrap data-[state=active]:bg-gray-50 dark:data-[state=active]:bg-gray-800 dark:hover:bg-gray-800 data-[state=active]:text-foreground data-[state=active]:shadow "
            >
              <span className="w-full text-left">Reviews & Ratings</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Right side with content */}
        <div className="flex-grow lg:p-4">
          <TabsContent className="" value="profile" key={1}>
            {/* 
              // profile card for users
            */}
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="lg:w-1/3 max-md:mx-8">
                <ProfileHeader />
              </div>
              <div className="lg:w-2/3 max-md:mx-8 mb-8">
                <UserInfo />
              </div>
            </div>
          </TabsContent>
          <TabsContent className="" value="settings" key={2}>
            <UserSettings />
          </TabsContent>
          <TabsContent className="" value="my-postings" key={3}>
            <UserListings />
          </TabsContent>
          <TabsContent className="" value="reviewsAndRatings" key={4}>
            <MyReviews />
          </TabsContent>
        </div>
      </div>
    </Tabs>
  )
}

export default MyUserProfile
