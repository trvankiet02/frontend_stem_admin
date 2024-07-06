import React from 'react'
import { Layout } from 'antd'
import ReportTable from './reportTable/ReportTable'
import ReportTop from './reportTop/ReportTop'

const { Header, Content } = Layout

const Reports = () => {
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
