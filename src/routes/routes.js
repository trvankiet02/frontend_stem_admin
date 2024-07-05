import DashBoard from '../components/dashboard/DashBoard'
import PageNotFound from '../components/pageNotFound/PageNotFound'
import Users from '../components/users/Users'
import Groups from '../components/groups/Groups'
import GroupDetail from '../components/groups/groupDetail/GroupDetail'
import Classes from '../components/classes/Classes'
import ClassDetail from '../components/classes/classDetail/ClassDetail'
import Reports from '../components/reports/Reports'
import Login from '../components/login/Login'

const privateRoutes = [
  { path: '/', element: <DashBoard /> },
  { path: '*', element: <PageNotFound /> },
  { path: '/users', element: <Users /> },
  { path: '/groups', element: <Groups /> },
  { path: '/groups/:uuid', element: <GroupDetail /> },
  { path: '/classes', element: <Classes /> },
  { path: '/classes/:uuid', element: <ClassDetail /> },
  { path: '/reports', element: <Reports /> },
]
const authRoutes = [{ path: '/login', element: <Login /> }]
export { privateRoutes, authRoutes }
