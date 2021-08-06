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
      <Button
        label="Reset"
        fill="outline"
        onClick={onResetFilters}
        size="initial-size"
      />
      <Button
        onClick={onCloseDrawer}
        color="primary"
        className="update-results"
        size="initial-size"
        label={`
                View ${totalResults} ${pluralise(totalResults, {
          one: 'Result',
          many: 'Results',
        })}`}
      />
    </div>
  );
};

export default DrawerActions;
