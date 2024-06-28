import AreaCard from './AreaCard'
import './AreaCards.scss'

const AreaCards = () => {
  return (
    <section className="content-area-cards">
      <AreaCard
        colors={['#e4e8ef', '#4ce13f']}
        percentFillValue={50}
        cardInfo={{
          title: 'Online Users',
          value: '15',
          text: 'Number of online users',
        }}
      />
      <AreaCard
        colors={['#e4e8ef', '#475be8']}
        percentFillValue={100}
        cardInfo={{
          title: 'New Users',
          value: '10',
          text: 'Number of new users.',
        }}
      />
      <AreaCard
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