import AreaCards from '../dashboard/areaCards/AreaCards'
import AreaCharts from '../dashboard/areaCharts/AreaCharts'
import AreaTable from '../dashboard/areaTable/AreaTable'
import AreaTop from '../dashboard/areaTop/AreaTop'

const Dashboard = () => {
  return (
    <div className="content-area">
      <AreaTop />
      <AreaCards />
      <AreaCharts />
      <AreaTable />
    </div>
  )
}

export default Dashboard
