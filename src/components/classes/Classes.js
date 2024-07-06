import React , {useEffect} from 'react'
import { Layout } from 'antd'
import ClassTop from '../classes/classTop/ClassTop'
import SearchBar from '../classes/searchBar/SearchBar'
import ClassTable from '../classes/classTable/ClassTable'
import { Navigate } from 'react-router-dom'
const { Header, Content } = Layout

const ClassPage = () => {
  useEffect(() => {
    const isLogin = localStorage.getItem('accessToken')
    if (!isLogin) {
      <Navigate to="/login" />
    }
  }, [])
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
