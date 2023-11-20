import { Separator } from '@/components/ui/separator'
import { Globe, Mail, Linkedin, Instagram } from 'lucide-react'

const TeamMember = ({
  name,
  role,
  image,
  website,
  linkedin,
  mail,
  instagram,
}) => (
  <div className="p-4 m-4 border rounded-md dark:bg-slate-900 shadow-md lg:w-[45%]">
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
          <a
            href={website}
            rel="noreferrer"
            target="_blank"
            className="text-gray-500 hover:text-primary"
          >
            <Globe size={24} />
          </a>
          <a
            href={linkedin}
            rel="noreferrer"
            target="_blank"
            className="ml-3 text-gray-500 hover:text-primary"
          >
            <Linkedin size={24} />
          </a>
          <a
            href={mail}
            rel="noreferrer"
            target="_blank"
            className="ml-3 text-gray-500 hover:text-primary"
          >
            <Mail size={24} />
          </a>
          <a
            href={instagram}
            rel="noreferrer"
            target="_blank"
            className="ml-3 text-gray-500 hover:text-primary"
          >
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
        About Us
      </h1>
      <p className="lg:w-[75%] mx-auto leading-relaxed text-base ">
        Welcome to our online marketplace, where innovation meets convenience
        within the university community! Behind this exciting project is our
        esteemed project supervisor and mentor, Dr. Khwairakpam Amitab, whose
        guidance and expertise have been the driving force behind our success.
        We are a team of four students from the Department of Information
        Technology, North-Eastern Hill University, Shillong, who have come
        together to create a platform that will help students buy and sell used
        items within the university community. We are passionate about what we
        do and committed to providing our users with a seamless experience.
      </p>
    </div>
    <div className="px-4 ">
      <div className="p-4 m-4 mx-auto border rounded-md dark:bg-slate-900 shadow-md lg:w-[45%]">
        <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
          <img
            alt="team"
            className="flex-shrink-0 rounded-lg w-40 h-44 object-cover object-center sm:mb-0 mb-4"
            src="https://nehu.ac.in/public/assets/images/faculty/IMG_khwairakpam_amitab_.jpg"
          />
          <div className="flex flex-col justify-start h-full sm:pl-8">
            <h2 className="title-font font-medium text-2xl ">
              Dr. Khwairakpam Amitab
            </h2>
            <h4 className="text-gray-500 dark:text-gray-400  text-md mt-1 ">
              Assistant Professor, Department of IT
            </h4>
            <h4 className="text-gray-500 dark:text-gray-400  text-md mt-1 mb-4">
              North-Eastern Hill University, Shillong
            </h4>
            <h3 className="text-gray-500 dark:text-gray-400  text-lg mt-1 mb-4">
              Project Supervisor and Mentor
            </h3>
          </div>
        </div>
      </div>
    </div>
    <Separator className="w-[75%] mx-auto my-8" />
    <div className="flex flex-col justify-center lg:flex-row sm:flex-wrap max-md:gap-4 mb-16">
      <TeamMember
        name="Anupam Kumar Singh"
        role="Project Lead and Backend Developer"
        image="https://storage.googleapis.com/campustradehub-storage.appspot.com/Assets/AKS_Enhanced.jpg"
        website="https://github.com/aksinghweb"
        linkedin="https://www.linkedin.com/in/aksinghweb/"
        mail="mailto:kanupam414@gmail.com"
        instagram="https://www.instagram.com/anupamksingh01/"
      />
      <TeamMember
        name="Suraj Bhagat"
        role="Frontend Developer"
        image="https://storage.googleapis.com/campustradehub-storage.appspot.com/Assets/suraj.jpeg"
        website="#"
        linkedin="#"
        mail="mailto:suraj777444@gmail.com"
        instagram="#"
      />
      <TeamMember
        name="Savelyness Iawphniaw"
        role="Frontend Developer"
        image="https://storage.googleapis.com/campustradehub-storage.appspot.com/Assets/savelyness.jpeg"
        website="#"
        linkedin="#"
        mail="mailto:savelyness2002@gmail.com"
        instagram="https://www.instagram.com/savely_iawphniaw/"
      />
      <TeamMember
        name="Lota Ingtipi"
        role="UI/UX Designer and QA Tester"
        image="https://storage.googleapis.com/campustradehub-storage.appspot.com/Assets/lota.jpeg"
        website="#"
        linkedin="https://www.linkedin.com/in/lota-ingtipi/"
        mail="mailto:lotaingtipi2021@gmail.com"
        instagram="https://www.instagram.com/tasoyalizangpi/"
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
