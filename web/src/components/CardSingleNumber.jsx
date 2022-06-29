import Card from './Card'
import { formatNumberNoFractions } from '../utils/util'

function CardSingleNumber({ title, amount, currency, className }) {
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
