import { useContext, useEffect, useRef, useNa } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { LIGHT_THEME } from '../../constants/themeConstants'
import LogoBlue from '../../assets/images/logo_blue.svg'
import LogoWhite from '../../assets/images/logo_white.svg'
import {
  MdOutlinePermIdentity,
  MdOutlineClose,
  MdOutlineGridView,
  MdOutlineLogout,
  MdSynagogue,
  MdOutlineSettings,
  MdGroups3,
  MdOutlineReportGmailerrorred,
  MdCameraOutdoor,
} from 'react-icons/md'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Sidebar.scss'
import { SidebarContext } from '../../context/SidebarContext'

const Sidebar = () => {
  const { theme } = useContext(ThemeContext)
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext)
  const location = useLocation()
  const navbarRef = useRef(null)
  const navigate = useNavigate()
  // closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== 'sidebar-oepn-btn'
    ) {
      closeSidebar()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const sidebarOptions = [
    { title: 'Dashboard', ref: '/', icon: <MdOutlineGridView size={18} /> },
    {
      title: 'Quản lý người dùng',
      ref: '/users',
      icon: <MdOutlinePermIdentity size={20} />,
    },
    {
      title: 'Quản lý nhóm',
      ref: '/groups',
      icon: <MdGroups3 size={20} />,
    },
    {
      title: 'Quản lý lớp',
      ref: '/classes',
      icon: <MdSynagogue size={20} />,
    },
    {
      title: 'Quản lý địa chỉ',
      ref: '/addresses',
      icon: <MdCameraOutdoor size={20} />,
    },
    {
      title: 'Quản lý vi phạm',
      ref: '/reports',
      icon: <MdOutlineReportGmailerrorred size={20} />,
    },
  ]

  const isActive = (ref) => {
    if (location.pathname === ref) return true
    if (ref === '/groups' && location.pathname.startsWith('/groups/')) {
      return true
    }
    if (ref === '/classes' && location.pathname.startsWith('/classes/')) {
      return true
    }
    return false
  }
  const LogOut = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <nav
      className={`sidebar ${isSidebarOpen ? 'sidebar-show' : ''}`}
      ref={navbarRef}
    >
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <img src={theme === LIGHT_THEME ? LogoBlue : LogoWhite} alt="" />
          <span className="sidebar-brand-text">STEM MANAGEMENT</span>
        </div>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose size={24} />
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            {sidebarOptions.map((sidebarOption, index) => {
              return (
                <>
                  <li className="menu-item">
                    <Link
                      to={sidebarOption.ref}
                      className={`menu-link ${
                        isActive(sidebarOption.ref) ? 'active' : ''
                      }`}
                    >
                      <span className="menu-link-icon">
                        {sidebarOption.icon}
                      </span>
                      <span className="menu-link-text">
                        {sidebarOption.title}
                      </span>
                    </Link>
                  </li>
                </>
              )
            })}
            {/* <li className="menu-item">
              <Link to="/" className="menu-link active">
                <span className="menu-link-icon">
                  <MdOutlineGridView size={18} />
                </span>
                <span className="menu-link-text">Dashboard</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineBarChart size={20} />
                </span>
                <span className="menu-link-text">Statistics</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineAttachMoney size={20} />
                </span>
                <span className="menu-link-text">Payment</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineCurrencyExchange size={18} />
                </span>
                <span className="menu-link-text">Transactions</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineShoppingBag size={20} />
                </span>
                <span className="menu-link-text">Products</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/users" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlinePeople size={20} />
                </span>
                <span className="menu-link-text">Users</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineMessage size={18} />
                </span>
                <span className="menu-link-text">Messages</span>
              </Link>
            </li> */}
          </ul>
        </div>

        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            {/* <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineSettings size={20} />
                </span>
                <span className="menu-link-text">Settings</span>
              </Link>
            </li> */}
            <li className="menu-item" onClick={() => LogOut()}>
              <Link className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineLogout size={20} />
                </span>
                <span className="menu-link-text">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar
