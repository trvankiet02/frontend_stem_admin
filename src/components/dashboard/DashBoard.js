import AreaCards from '../dashboard/areaCards/AreaCards'
import AreaCharts from '../dashboard/areaCharts/AreaCharts'
import AreaTable from '../dashboard/areaTable/AreaTable'
import AreaTop from '../dashboard/areaTop/AreaTop'
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useApi from '../../api/Api'

const Dashboard = () => {
  const Api = useApi()

  useEffect(() => {
    fetchData()
    const isLogin = localStorage.getItem('accessToken')
    if (!isLogin) {
      ;<Navigate to="/login" />
    }
  }, [])

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  })

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
  }
  const fetchData = async (params = {}) => {
    try {
      const response = await Api.get(
        'http://localhost:9000/api/v1/users/admin/get-all-users',
        {
          headers,
          params: {
            size: pagination.pageSize,
            page: pagination.current,
            ...params,
          },
        }
      )
      setPagination((prevPagination) => ({
        ...prevPagination,
        total: response.data.result.totalPages * prevPagination.pageSize,
      }))
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  return (
    <div className="content-area">
      {/* <AreaTop /> */}
      {/* <AreaCards />
      <AreaCharts />
      <AreaTable /> */}
      <h1>Trang quản lý hệ thống mạng xã hội học tập STEM</h1>
      <img
        src={
          'https://res.cloudinary.com/djzwxw0ao/image/upload/v1696942528/uqbxidtwcdbqn8glt6we.jpg'
        }
        alt={'avtStem'}
        width="100%"
        height="100%"
      />
    </div>
  )
}

export default Dashboard
