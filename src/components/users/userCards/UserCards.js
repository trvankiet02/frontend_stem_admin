import UserCard from './UserCard'
import './UserCard'

const AreaCards = () => {
  return (
    <section className="content-area-cards">
      <UserCard
        colors={['#e4e8ef', '#4ce13f']}
        percentFillValue={50}
        cardInfo={{
          title: 'Online Users',
          value: '15',
          text: 'Number of online users',
        }}
      />
      <UserCard
        colors={['#e4e8ef', '#475be8']}
        percentFillValue={100}
        cardInfo={{
          title: 'New Users',
          value: '10',
          text: 'Number of new users.',
        }}
      />
      <UserCard
        colors={['#e4e8ef', '#eb4034']}
        percentFillValue={100}
        cardInfo={{
          title: 'Banned Users',
          value: '1',
          text: 'Number of banned users',
        }}
      />
    </section>
  )
}

export default AreaCards
