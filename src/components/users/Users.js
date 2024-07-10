import React, { useEffect } from 'react'
import { Layout } from 'antd'
import SearchBar from './searchBar/SearchBar'
import UserTable from '../users/userTable/UserTable'
import UserTop from '../users/userTop/UserTop'
import { Navigate } from 'react-router-dom'
const { Header, Content } = Layout

const UserPage = () => {
  useEffect(() => {
    const isLogin = localStorage.getItem('accessToken')
    if (!isLogin) {
      ;<Navigate to="/login" />
    }
  }, [])
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
