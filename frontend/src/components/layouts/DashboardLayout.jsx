import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import Navbar from './Navbar'

const DashboardLayout = ({ children }) => {
    const { user } = useContext(UserContext)
    return (
        <div>
            <Navbar />
            {user === undefined ? <div>Loading...</div> : <div>{children}</div>}
        </div>
    )
}

export default DashboardLayout
