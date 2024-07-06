import AreaBarChart from './AreaBarChart'
import AreaProgressChart from './AreaProgressChart'

const AreaCharts = ({ classDetail }) => {
  return (
    <section className="content-area-charts">
      <AreaBarChart classDetail={classDetail} />
      <AreaProgressChart classDetail={classDetail} />
    </section>
  )
}

export default AreaCharts
