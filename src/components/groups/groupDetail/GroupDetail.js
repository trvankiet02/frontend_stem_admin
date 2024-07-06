import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { message } from 'antd'
import useApi from '../../../api/Api'

import AreaCards from './groupDetailCard/AreaCards'
import AreaCharts from './groupDetailChart/AreaCharts'
import AreaTable from './groupDetailTable/AreaTable'
import AreaTop from './groupDetailTop/AreaTop'
import { Navigate } from 'react-router-dom'
import PageNotFound from '../../pageNotFound/PageNotFound'

const GroupDetail = () => {
  const { uuid: groupId } = useParams()
  const [group, setGroup] = useState(null)
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
    const fetchGroup = async () => {
      try {
        console.log(groupId)
        const response = await Api.get(
          `http://localhost:9000/api/v1/groups/${groupId}`,
          {
            headers,
          }
        )
        setGroup(response.data.result.group)
      } catch (error) {
        console.error('Error fetching group:', error)
        message.error('Failed to fetch group details.')
      } finally {
        setLoading(false)
      }
    }

    fetchGroup()
  }, [groupId])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!group) {
    return <PageNotFound />
  }

  return (
    <div className="content-area">
      <AreaTop group={group} />
      <AreaCards group={group} />
      {/* <AreaCharts group={group} /> */}
      <AreaTable group={group} />
    </div>
  )
}

export default GroupDetail
