import { Dispatch, FC, SetStateAction } from 'react';
import dynamic from 'next/dynamic';
import { IChoice } from 'core/atoms/choiceboxes/interfaces';
import Choiceboxes from 'core/atoms/choiceboxes';
import Skeleton from '../../components/Skeleton';

const ChevronForwardSharp = dynamic(
  () => import('core/assets/icons/ChevronForwardSharp'),
  {
    loading: () => <Skeleton count={1} />,
    ssr: false,
  },
);
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Button = dynamic(() => import('core/atoms/button'), {
  loading: () => <Skeleton count={4} />,
  ssr: false,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IHelpMeChooseContainer {
  title: string;
  choicesValues: IChoice[];
  setChoice: Dispatch<SetStateAction<any>>;
  multiSelect?: boolean;
  currentValue?: string | string[];
  onClickContinue: () => void;
  clearMultiSelectTitle?: string;
  withIcons?: boolean;
  submitBtnText?: string;
}

const HelpMeChooseContainer: FC<IHelpMeChooseContainer> = ({
  title,
  choicesValues,
  setChoice,
  multiSelect,
  currentValue,
  onClickContinue,
  clearMultiSelectTitle,
  withIcons,
  submitBtnText,
}) => {
  /** handler for multiselect */
  const handleChecked = (checked: IChoice) => {
    let newSelectedData: string[] = [...(currentValue || '')];
    // Add.
    if (checked.active)
      newSelectedData = [
        ...((currentValue as string[]) || ''),
        checked.value as string,
      ];
    // Remove.
    else {
      newSelectedData = (currentValue as string[]).filter(
        (filter: string | number) => checked.value !== filter,
      );
    }
    setChoice(newSelectedData.filter(Boolean));
  };

  const onSubmitChoice = (value: IChoice) => {
    if (multiSelect) {
      handleChecked(value);
    } else {
      setChoice([value.value]);
    }
  };

  return (
    <>
      <div className="row:stepped-form">
        <Heading
          tag="h1"
          color="black"
          size="xlarge"
          className="stepped-form--title"
        >
          {title}
        </Heading>
        {multiSelect && (
          <Text tag="p" size="regular" color="darker" className="-mb-100">
            Select As Many As You Like
          </Text>
        )}
        <div className="stepped-form--filter">
          <Choiceboxes
            className={`-cols-${
              choicesValues?.length < 3 ? 2 : 3
            } -teal stepped-form--choiceboxes -mb-400`}
            choices={choicesValues}
            onSubmit={value => onSubmitChoice(value)}
            multiSelect={multiSelect}
            clearMultiSelectTitle={clearMultiSelectTitle}
            onClearClick={() => setChoice([''])}
            withIcons={withIcons}
            currentValue={currentValue}
          />
          {choicesValues.length === 1 && (
            <Text>
              It seems there is only 1 option available, please go back a step
              and change your selection to expand your choice
            </Text>
          )}
        </div>
        <Button
          color="primary"
          dataTestId="submit"
          icon={<ChevronForwardSharp />}
          iconColor="white"
          iconPosition="after"
          label={submitBtnText ?? 'Continue'}
          type="submit"
          size="large"
          onClick={onClickContinue}
          disabled={!currentValue?.length}
        />
      </div>
    </>
  );
};

export default HelpMeChooseContainer;
