import Card from './Card'
import { formatNumberNoFractions } from '../utils/util'
import NoData from './NoData';

function CardSingleNumber({ title, amount, currency, className }) {
  if (amount === undefined || amount === null) {
    return (
      <Card>
        <NoData />
      </Card>
    )
  }

  return (
    <Card title={title} className={className}>
      <p className="text-primary font-bold">
        <span className="text-3xl">{formatNumberNoFractions(amount) + (currency ? ' ' + currency : '')}
        </span>

      </p>
    </Card>
  );
}

export default CardSingleNumber;
