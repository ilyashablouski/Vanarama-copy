import { Dispatch, FC, SetStateAction } from 'react';
import { IChoice } from '@vanarama/uibook/lib/components/atoms/choiceboxes/interfaces';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Choiceboxes from '@vanarama/uibook/lib/components/atoms/choiceboxes';
import ChevronForwardSharp from '@vanarama/uibook/lib/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Text from '@vanarama/uibook/lib/components/atoms/text';

interface HelpMeChooseContainer {
  title: string;
  choicesValues: IChoice[];
  setChoice: Dispatch<SetStateAction<any>>;
  multiSelect?: boolean;
  currentValue?: string | string[];
  onClickContinue: () => void;
  clearMultiSelectTitle?: string;
  withIcons?: boolean;
}

const HelpMeChooseContainer: FC<HelpMeChooseContainer> = ({
  title,
  choicesValues,
  setChoice,
  multiSelect,
  currentValue,
  onClickContinue,
  clearMultiSelectTitle,
  withIcons,
}) => {
  /** handler for multiselect */
  const handleChecked = (checked: IChoice) => {
    let newSelectedData = [...currentValue];
    // Add.
    if (checked.active) newSelectedData = [...currentValue, checked.value];
    // Remove.
    else {
      newSelectedData = (currentValue as string[]).filter(
        (filter: string | number) => checked.value !== filter,
      );
    }
    setChoice(newSelectedData.filter(Boolean));
  };

  return (
    <>
      <div className="row:progress">{/* <ConsumerProgressIndicator /> */}</div>
      <section className="row:lead-text">
        <Heading tag="h1" color="black" size="xlarge">
          {title}
        </Heading>
      </section>
      {!!choicesValues.length && (
        <div className="row:cards-3col">
          <Choiceboxes
            className={`-cols-${choicesValues?.length < 3 ? 2 : 3}`}
            choices={choicesValues}
            onSubmit={value => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              multiSelect ? handleChecked(value) : setChoice(value.value);
            }}
            multiSelect={multiSelect}
            clearMultiSelectTitle={clearMultiSelectTitle}
            onClearClick={() => setChoice([''])}
            withIcons={withIcons}
          />
          {choicesValues.length === 1 && (
            <Text>
              It seems there is only 1 option available, please go back a step
              and change your selection to expand your choice
            </Text>
          )}
          <Button
            color="primary"
            dataTestId="submit"
            icon={<ChevronForwardSharp />}
            iconColor="white"
            iconPosition="after"
            label="Continue"
            type="submit"
            size="large"
            onClick={onClickContinue}
            disabled={!currentValue?.length}
          />
        </div>
      )}
    </>
  );
};

export default HelpMeChooseContainer;
