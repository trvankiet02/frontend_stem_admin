import React from 'react'
import { Layout } from 'antd'
import ClassTop from '../classes/classTop/ClassTop'
import SearchBar from '../classes/searchBar/SearchBar'
import ClassTable from '../classes/classTable/ClassTable'

const { Header, Content } = Layout

const ClassPage = () => {
  return (
    <>
      <ClassTop />
      <Layout>
        <SearchBar />
        <Content style={{ padding: '8px' }}>
          <ClassTable />
        </Content>
      </Layout>
    </>
  )
}

export default ClassPage
