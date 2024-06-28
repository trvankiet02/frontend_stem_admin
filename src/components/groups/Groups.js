import React from 'react'
import { Layout } from 'antd'
import GroupTop from '../groups/groupTop/GroupTop'
import SearchBar from '../groups/searchBar/SearchBar'
import GroupTable from '../groups/groupTable/GroupTable'

const { Header, Content } = Layout

const GroupPage = () => {
  return (
    <>
      <GroupTop />
      <Layout>
        <SearchBar />
        <Content style={{ padding: '8px' }}>
          <GroupTable />
        </Content>
      </Layout>
    </>
  )
}

export default GroupPage
