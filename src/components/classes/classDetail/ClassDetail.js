import AreaCards from './areaCards/AreaCards'
import AreaCharts from './areaCharts/AreaCharts'
import AreaTable from './areaTable/AreaTable'
import AreaTop from './areaTop/AreaTop'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
const ClassDetail = () => {
  useEffect(() => {
    const isLogin = localStorage.getItem('accessToken')
    if (!isLogin) {
      <Navigate to="/login" />
    }
  }, [])
  return (
    <div className="content-area">
      <AreaTop />
      <AreaCards />
      <AreaCharts />
      <AreaTable />
    </div>
  )
}

export default ClassDetail
