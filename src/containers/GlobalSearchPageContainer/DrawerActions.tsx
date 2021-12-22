import Button from 'core/atoms/button/Button';
import { pluralise } from '../../utils/dates';

interface IProps {
  totalResults: number;
  onResetFilters: () => void;
  onCloseDrawer: () => void;
  dataUiTestId?: string;
}

const DrawerActions = ({
  totalResults,
  onResetFilters,
  onCloseDrawer,
  dataUiTestId,
}: IProps) => {
  return (
    <div className="actions">
      <Button
        label="Reset"
        fill="outline"
        onClick={onResetFilters}
        size="initial-size"
        dataUiTestId={`${dataUiTestId}_button_reset`}
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
        dataUiTestId={`${dataUiTestId}_button_results`}
      />
    </div>
  );
};

export default DrawerActions;
