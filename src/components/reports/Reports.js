import React , {useEffect} from 'react'
import { Navigate } from 'react-router-dom'
const Reports = () => {
  useEffect(() => {
    const isLogin = localStorage.getItem('accessToken')
    if (!isLogin) {
      <Navigate to="/login" />
    }
  }, [])

  return <div>Reports</div>
}

export default Reports
