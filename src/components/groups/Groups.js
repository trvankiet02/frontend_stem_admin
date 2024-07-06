import React , {useEffect} from 'react'
import { Layout } from 'antd'
import GroupTop from '../groups/groupTop/GroupTop'
import SearchBar from '../groups/searchBar/SearchBar'
import GroupTable from '../groups/groupTable/GroupTable'
import { Navigate } from 'react-router-dom'
const { Header, Content } = Layout

const GroupPage = () => {
  useEffect(() => {
    const isLogin = localStorage.getItem('accessToken')
    if (!isLogin) {
      <Navigate to="/login" />
    }
  }, [])
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
