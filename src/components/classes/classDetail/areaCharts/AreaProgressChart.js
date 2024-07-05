import React, { useEffect, useState } from 'react'
import useApi from '../../../../api/Api'
const AreaProgressChart = ({ classDetail }) => {
  const Api = useApi()
  const [data, setData] = useState([])
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get(
          `http://localhost:9000/api/v1/exams/admin/top-5`,
          {
            headers,
          }
        )
        setData(response.data.result)
        console.log(response.data.result)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [classDetail.id])

  return (
    <>
      <div className="progress-bar">
        <div className="progress-bar-info">
          <h4 className="progress-bar-title">Bài kiểm tra nổi bật</h4>
        </div>
        <div className="progress-bar-list">
          {data?.map((item) => {
            return (
              <div className="progress-bar-item" key={item?.exam?.id}>
                <div className="bar-item-info">
                  <p className="bar-item-info-name">{item?.exam.name}</p>
                  <p className="bar-item-info-value">
                    {item?.count} lượt tham gia
                  </p>
                </div>
                <div className="bar-item-full">
                  <div
                    className="bar-item-filled"
                    style={{
                      width: `0%`,
                    }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default AreaProgressChart
