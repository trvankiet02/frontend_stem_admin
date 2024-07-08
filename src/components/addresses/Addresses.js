import React, { useEffect } from 'react'
import { Layout } from 'antd'
import { Navigate } from 'react-router-dom'
import AddressTop from '../addresses/addressTop/AddressTop'
import AddressManagement from '../addresses/addressTable/AddressTable'
const { Header, Content } = Layout

const AddressPage = () => {
  useEffect(() => {
    const isLogin = localStorage.getItem('accessToken')
    if (!isLogin) {
      ;<Navigate to="/login" />
    }
  }, [])
  return (
    <>
      <AddressTop />
      <Layout>
        <Content style={{ padding: '8px' }}>
          <AddressManagement />
        </Content>
      </Layout>
    </>
  )
}

export default AddressPage
