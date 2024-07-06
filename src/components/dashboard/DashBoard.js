import AreaCards from '../dashboard/areaCards/AreaCards'
import AreaCharts from '../dashboard/areaCharts/AreaCharts'
import AreaTable from '../dashboard/areaTable/AreaTable'
import AreaTop from '../dashboard/areaTop/AreaTop'

const Dashboard = () => {
  return (
    <div className="content-area">
      {/* <AreaTop /> */}
      {/* <AreaCards />
      <AreaCharts />
      <AreaTable /> */}
      <h1>Trang quản lý hệ thống mạng xã hội học tập STEM</h1>
      <img
        src={
          'https://res.cloudinary.com/djzwxw0ao/image/upload/v1696942528/uqbxidtwcdbqn8glt6we.jpg'
        }
        alt={'avtStem'}
        width="100%"
        height="100%"
      />
    </div>
  )
}

export default Dashboard
