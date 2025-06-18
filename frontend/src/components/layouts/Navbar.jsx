import { Link } from "react-router-dom"
import ProfileInfoCard from "../Cards/ProfileInfoCard";

const Navbar = () => {
  return (
    <div className="h-16 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-2.5 px-10 md:px-0 sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between">
        <Link to='/dashboard'>
          <div className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2 text-black">
            <span className="text-[#FF9324]">⚡</span> Prep <span className="text-[#FF9324]">AI</span>
          </div>
        </Link>
        <ProfileInfoCard/>
      </div>
    </div>
  )
}

export default Navbar
