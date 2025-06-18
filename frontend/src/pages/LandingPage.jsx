import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import HERO_IMG from '../assets/Hero.png'
import { APP_FEATURES } from '../utils/data'
import Modal from "../components/Modal"
import Login from "./Login"
import SignUp from "./SignUp"
import { UserContext } from "../context/userContext"
import ProfileInfoCard from "../components/Cards/ProfileInfoCard"

const LandingPage = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  const [openAuthModel, setOpenAuthModel] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModel(true)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <>
      <div className="w-full min-h-screen bg-[#FFFCEF] relative overflow-hidden">
        <div className="w-[400px] h-[400px] md:w-[800px] md:h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0" />

        <nav className="w-full px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center relative z-20 max-w-screen-xl mx-auto">
          <div className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2 text-black">
            <span className="text-[#FF9324]">⚡</span> Prep <span className="text-[#FF9324]">AI</span>
          </div>
          {user ? (
            <ProfileInfoCard />
          ) : (
            <button
            className="relative inline-block px-6 py-2.5 text-sm font-semibold text-white rounded-full overflow-hidden group border border-white bg-gradient-to-r from-[#FF9324] to-[#e99a4b] transition-all duration-300"
            onClick={() => setOpenAuthModel(true)}
          >
            <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transform transition-transform duration-300 origin-right z-0 rounded-full"></span>
            <span className="relative z-10 group-hover:text-[#FF9324] transition-colors duration-300">
              Login / SignUp
            </span>
          </button>)}
        </nav>

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-20 pb-32 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-black leading-tight mb-6">
            Ace Interview with <br />
            <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine">
              AI-Powered
            </span>{" "}
            Learning
          </h1>

          <p className="text-lg sm:text-xl text-gray-800 mb-8">
            Your AI interview coach is here.
            Practice smarter, not harder — with role-specific questionsand make them arrange as per your need.
          </p>

          <button className="relative inline-block px-8 py-3 text-sm font-semibold text-white bg-black rounded-full overflow-hidden group transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-yellow-50 hover:border-orange-500">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-tr from-yellow-300 via-yellow-400 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-0 blur-[1px]"></span>

            <span onClick={() => navigate('/dashboard')} className="relative z-10 group-hover:text-black transition-colors duration-300">
              Get Started
            </span>
          </button>

        </div>
      </div>

      <div className="w-full min-h-full relative z-10">
        <div>
          <section className="flex items-center justify-center -mt-36">
            <img src={HERO_IMG} alt="img" className="w-[80vw] rounded-lg" />
          </section>
        </div>

        <div className="w-full min-h-full bg-[#FFFCEF] mt-10">
          <div className="container mx-auto px-4 pt-10 pb-20">
            <section className="mt-5">
              <h2 className="text-3xl font-bold text-center mb-12">
                Features That Make You <span className="text-[#f78614]">Shine</span>
              </h2>

              <div className="flex flex-col items-center gap-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  {APP_FEATURES.slice(3).map((feature) => (
                    <div key={feature.id} className="bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-200 transition border border-amber-200">
                      <h3 className="text-base font-semibold mb-3">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div >

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {APP_FEATURES.slice(3).map((feature) => (
                    <div key={feature.id} className="bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-200 transition border border-amber-200">
                      <h3 className="text-base font-semibold mb-3">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="text-lg bg-gray-50 text-secondary text-center p-5 mt-5">Make your preparation more strong</div>
      </div>

      <Modal
        isOpen={openAuthModel}
        onClose={() => {
          setOpenAuthModel(false)
          setCurrentPage('login')
        }}
        hideHeader
      >
        <div>
          {currentPage === 'login' && (
            <Login setCurrentPage={setCurrentPage} />
          )}
          {currentPage === 'signup' && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal >
    </>
  )
}

export default LandingPage
