import { useContext } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { ThemeContext } from '../../../../context/ThemeContext'
import { FaArrowUpLong } from 'react-icons/fa6'
import { LIGHT_THEME } from '../../../../constants/themeConstants'
import './AreaCharts.scss'

const AreaBarChart = ({ classDetail }) => {
  const { theme } = useContext(ThemeContext)

  const formatTooltipValue = (value) => {
    return `${value}k`
  }

  const formatYAxisLabel = (value) => {
    return `${value}k`
  }

  const formatLegendValue = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1)
  }

  return (
    <div className="bar-chart">
      {/*if classDetail?.coverUrl === null render coverUrl or not render https://res.cloudinary.com/djzwxw0ao/image/upload/v1696942528/uqbxidtwcdbqn8glt6we.jpg */}
      <img
        src={
          classDetail?.coverUrl
            ? classDetail?.coverUr
            : 'https://res.cloudinary.com/djzwxw0ao/image/upload/v1696942528/uqbxidtwcdbqn8glt6we.jpg'
        }
        alt={classDetail?.name}
        className="bar-chart__cover"
        width="100%"
        height="100%"
      />
    </div>
  )
}

export default AreaBarChart
