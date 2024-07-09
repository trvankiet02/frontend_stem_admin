import { Outlet, Navigate } from 'react-router-dom'
import Sidebar from '../components/sidebar/Sidebar'
import { useEffect } from 'react'

const BaseLayout = () => {
  return (
    <main className="page-wrapper">
      {/* left of page */}
      <Sidebar />
      {/* right side/content of the page */}
      <div className="content-wrapper">
        <Outlet />
      </div>
    </main>
  )
}

export default BaseLayout
