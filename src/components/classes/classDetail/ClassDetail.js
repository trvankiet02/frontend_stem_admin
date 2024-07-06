import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { message } from 'antd'
import useApi from '../../../api/Api'

import AreaCards from './areaCards/AreaCards'
import AreaCharts from './areaCharts/AreaCharts'
import AreaTable from './areaTable/AreaTable'
import AreaTop from './areaTop/AreaTop'
import PageNotFound from '../../pageNotFound/PageNotFound'
import { Navigate } from 'react-router-dom'
const ClassDetail = () => {


  const { uuid: classId } = useParams()
  const [classDetail, setClassDetail] = useState(null)
  const [loading, setLoading] = useState(true)
  const Api = useApi()
  useEffect(() => {
    const isLogin = localStorage.getItem('accessToken')
    if (!isLogin) {
      <Navigate to="/login" />
    }
  }, [])
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
  }

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await Api.get(
          `http://localhost:9000/api/v1/groups/${classId}`,
          {
            headers,
          }
        )
        setClassDetail(response.data.result.group)
      } catch (error) {
        console.error('Error fetching class:', error)
        message.error('Failed to fetch class details.')
      } finally {
        setLoading(false)
      }
    }

    fetchClass()
  }, [classId])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!classDetail) {
    return <PageNotFound />
  }

  return (
    <div className="content-area">
      <AreaTop classDetail={classDetail} />
      <AreaCards classDetail={classDetail} />
      <AreaCharts classDetail={classDetail} />
      <AreaTable classDetail={classDetail} />
    </div>
  )
}

export default ClassDetail
