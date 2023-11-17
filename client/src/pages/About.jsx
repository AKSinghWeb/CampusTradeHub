import { Globe, Mail, Linkedin, Instagram } from 'lucide-react'

const TeamMember = ({ name, role, image }) => (
  <div className="p-4 lg:w-1/2">
    <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
      <img
        alt="team"
        className="flex-shrink-0 rounded-lg w-40 h-44 object-cover object-center sm:mb-0 mb-4"
        src={image}
      />
      <div className="flex flex-col justify-start h-full sm:pl-8">
        <h2 className="title-font font-medium text-2xl ">{name}</h2>
        <h3 className="text-gray-500 dark:text-gray-400  text-lg mt-1 mb-4">
          {role}
        </h3>

        <span className="inline-flex max-md:justify-center">
          <a href="#" className="text-gray-500 hover:text-primary">
            <Globe size={24} />
          </a>
          <a href="#" className="ml-3 text-gray-500 hover:text-primary">
            <Linkedin size={24} />
          </a>
          <a href="#" className="ml-3 text-gray-500 hover:text-primary">
            <Mail size={24} />
          </a>
          <a href="#" className="ml-3 text-gray-500 hover:text-primary">
            <Instagram size={24} />
          </a>
        </span>
      </div>
    </div>
  </div>
)

const TeamSection = () => (
  <section className="body-font">
    <div className="flex flex-col text-center w-full mb-20">
      <h1 className="text-2xl font-medium title-font mb-4 tracking-widest">
        OUR TEAM
      </h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
        Meet our team of developers—passionate problem-solvers, code
        enthusiasts, and architects behind the CampusTradeHub. We&apos;re here
        to turn challenges into opportunities and create a platform that makes a
        difference.
      </p>
    </div>
    <div className="flex flex-col md:flex-row md:flex-wrap max-md:gap-4 m-4">
      <TeamMember
        name="Anupam Kumar Singh"
        role="Project Lead and Backend Developer"
        image="https://storage.googleapis.com/campustradehub-storage.appspot.com/Assets/AKS_Enhanced.jpg"
      />
      <TeamMember
        name="Suraj Bhagat"
        role="Frontend Developer"
        image="https://storage.googleapis.com/campustradehub-storage.appspot.com/Assets/suraj.jpeg"
      />
      <TeamMember
        name="Savelyness Iawphniaw"
        role="Frontend Developer"
        image="https://storage.googleapis.com/campustradehub-storage.appspot.com/Assets/savelyness.jpeg"
      />
      <TeamMember
        name="Lota Ingtipi"
        role="UI/UX Designer and QA Tester"
        image="https://storage.googleapis.com/campustradehub-storage.appspot.com/Assets/lota.jpeg"
      />
    </div>
  </section>
)

const About = () => {
  return (
    <div className="container px-5 pt-20 max-md:pb-12 min-h-screen mx-auto">
      <TeamSection />
    </div>
  )
}

export default About
