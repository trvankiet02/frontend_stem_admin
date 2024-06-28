import React from 'react'
import { Layout } from 'antd'
import SearchBar from './searchBar/SearchBar'
import UserTable from '../users/userTable/UserTable'
import UserTop from '../users/userTop/UserTop'

const { Header, Content } = Layout

const UserPage = () => {
  return (
    <>
      <UserTop />
      <Layout>
        <SearchBar />
        <Content style={{ padding: '8px' }}>
          <UserTable />
        </Content>
      </Layout>
    </>
  )
}

export default UserPage
