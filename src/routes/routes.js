import DashBoard from '../components/dashboard/DashBoard'
import PageNotFound from '../components/pageNotFound/PageNotFound'
import Users from '../components/users/Users'
import Groups from '../components/groups/Groups'
import GroupMembers from '../components/groupMemers/GroupMembers'
import Classes from '../components/classes/Classes'
import Reports from '../components/reports/Reports'
import Login from '../components/login/Login'

const privateRoutes = [
  { path: '/', element: <DashBoard /> },
  { path: '*', element: <PageNotFound /> },
  { path: '/users', element: <Users /> },
  { path: '/groups', element: <Groups /> },
  { path: '/classes', element: <Classes /> },
  { path: '/group-members/:uuid', element: <GroupMembers /> },
  { path: '/reports', element: <Reports /> },
]
const authRoutes = [{ path: '/login', element: <Login /> }]
export { privateRoutes, authRoutes}
