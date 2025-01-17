import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Layout } from 'antd'
import ReportTop from './reportTop/ReportTop'
import ReportTable from './reportTable/ReportTable'
const { Header, Content } = Layout
const Reports = () => {
  useEffect(() => {
    const isLogin = localStorage.getItem('accessToken')
    if (!isLogin) {
      ;<Navigate to="/login" />
    }
  }, [])

  return (
    <>
      <ReportTop />
      <Layout>
        <Content style={{ padding: '8px' }}>
          <ReportTable />
        </Content>
      </Layout>
    </>
  )
}

export default Reports
