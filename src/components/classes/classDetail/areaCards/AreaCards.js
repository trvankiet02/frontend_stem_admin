import React, { useEffect, useState } from 'react'
import AreaCard from './AreaCard'
import './AreaCards.scss'
import useApi from '../../../../api/Api'

const AreaCards = ({ classDetail }) => {
  const [postsCount, setPostsCount] = useState(0)
  const [commentsCount, setCommentsCount] = useState(0)
  const [reactionsCount, setReactionsCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const Api = useApi()
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
  }

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [postsResponse, commentsResponse, reactionsResponse] =
          await Promise.all([
            Api.get(
              `http://localhost:9000/api/v1/posts/admin/count?groupId=${classDetail.id}`,
              { headers }
            ),
            Api.get(
              `http://localhost:9000/api/v1/comments/admin/count?groupId=${classDetail.id}`,
              { headers }
            ),
            Api.get(
              `http://localhost:9000/api/v1/reactions/admin/count?groupId=${classDetail.id}`,
              { headers }
            ),
          ])
        setPostsCount(postsResponse.data.result)
        setCommentsCount(commentsResponse.data.result)
        setReactionsCount(reactionsResponse.data.result)
      } catch (error) {
        console.error('Error fetching counts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCounts()
  }, [classDetail.id])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <section className="content-area-cards">
      <AreaCard
        colors={['#e4e8ef', '#4ce13f']}
        percentFillValue={100}
        cardInfo={{
          title: 'Tổng bài viết',
          value: postsCount.toString(),
          text: 'Số bài viết trong lớp',
        }}
      />
      <AreaCard
        colors={['#e4e8ef', '#475be8']}
        percentFillValue={100}
        cardInfo={{
          title: 'Tổng bình luận',
          value: commentsCount.toString(),
          text: 'Số bình luận trong lớp',
        }}
      />
      <AreaCard
        colors={['#e4e8ef', '#eb4034']}
        percentFillValue={100}
        cardInfo={{
          title: 'Tổng cảm xúc',
          value: reactionsCount.toString(),
          text: 'Số cảm xúc trong lớp',
        }}
      />
    </section>
  )
}

export default AreaCards
