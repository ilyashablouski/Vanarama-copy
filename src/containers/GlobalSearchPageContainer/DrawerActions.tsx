import Button from 'core/atoms/button/Button';
import { pluralise } from '../../utils/dates';

interface IProps {
  totalResults: number;
  onResetFilters: () => void;
  onCloseDrawer: () => void;
}

const DrawerActions = ({
  totalResults,
  onResetFilters,
  onCloseDrawer,
}: IProps) => {
  return (
    <div className="actions">
      <Button label="Reset" fill="outline" onClick={onResetFilters} />
      <Button
        onClick={onCloseDrawer}
        color="primary"
        className="update-results"
        label={`
                View ${totalResults} ${pluralise(totalResults, {
          one: 'Card',
          many: 'Cards',
        })}`}
      />
    </div>
  );
};

export default DrawerActions;
