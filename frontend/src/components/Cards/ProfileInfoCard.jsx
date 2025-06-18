import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom'

const ProfileInfoCard = () => {
    const { user, clearUser } = useContext(UserContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear()
        clearUser()
        navigate('/')
    }
    return (
        user && (
            <div className='flex items-center gap-8'>
                <img src={user.ProfileImageUrl} alt="Profile" className='w-11 h-11 bg-gray-300 rounded-full' />
                <div>
                    <button className='px-4 py-3 rounded-xl font-bold bg-amber-500 text-white text-sm cursor-pointer hover: px-4.2' onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

        )
    )
}

export default ProfileInfoCard
