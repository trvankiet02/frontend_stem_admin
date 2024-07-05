import AreaCards from './areaCards/AreaCards'
import AreaCharts from './areaCharts/AreaCharts'
import AreaTable from './areaTable/AreaTable'
import AreaTop from './areaTop/AreaTop'

const ClassDetail = () => {
  return (
    <div className="content-area">
      <AreaTop />
      <AreaCards />
      <AreaCharts />
      <AreaTable />
    </div>
  )
}

export default ClassDetail
