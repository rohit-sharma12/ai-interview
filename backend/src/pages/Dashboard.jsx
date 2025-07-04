import { LuPlus } from "react-icons/lu"
import { CARD_BG } from '../utils/data'
import DashboardLayout from "../components/layouts/DashboardLayout"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axiosInstance from "../utils/axiosInstance"
import { API_PATHS } from "../utils/apiPaths"


const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([])

  const [openDeleteAlert, setOpenOpenDeleteAlert] = useState({
    open: false,
    data: null,
  })

  const fetchAllSession = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL)
      setSessions(response.data)
    } catch (error) {
      console.error('Error fetching session data:', error)
    }
  }

  const deleteSession = async (sessionsData) => { }

  useEffect(() => {
    fetchAllSession()
  }, [])
  return (
    <DashboardLayout>
      <div className="container mx-auto pt-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
          {sessions?.map((data, index) => (
            <SummaryCard
              key={data?._id}
              colors={CARD_BG[index % CARD_BG.length]}
              role={data?.role || ""}
              topicsToFocus={data?.topicsToFocus || ""}
              experience={data?.experience || "-"}
              questions={data?.questions?.length || '-'}
              description={data?.description || ''}
              lastUpdated={
                data?.updatedAt ? moment(data.updatedAt).format('DO MMM YYYY') : ''
              }
              onSelect={() => navigate(`/interview-prep/${data?._id}`)}
              onDelete={() => setOpenOpenDeleteAlert({ open: true, data })}
            />
          ))}
        </div>
        <button className="h-12 md:h-12 flex items-center justify-center text-white rounded-full bg-linear-to-r from-[#FF9324] to-[#e99a4b] py-2.5 px-7 hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10 md:right-20" onClick={() => setOpenCreateModal(true)}>
          <LuPlus className="text-2xl text-white" />
          Add New
        </button>
      </div>

    </DashboardLayout>
  )
}

export default Dashboard
