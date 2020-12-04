import { Dispatch, FC, SetStateAction } from 'react';
import dynamic from 'next/dynamic';
import { IChoice } from '@vanarama/uibook/lib/components/atoms/choiceboxes/interfaces';
import Choiceboxes from '@vanarama/uibook/lib/components/atoms/choiceboxes';
import Skeleton from '../../components/Skeleton';

const ChevronForwardSharp = dynamic(
  () => import('@vanarama/uibook/lib/assets/icons/ChevronForwardSharp'),
  {
    loading: () => <Skeleton count={1} />,
    ssr: false,
  },
);
const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Button = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/button'),
  {
    loading: () => <Skeleton count={4} />,
    ssr: false,
  },
);
const Text = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/text'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

interface HelpMeChooseContainer {
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

const HelpMeChooseContainer: FC<HelpMeChooseContainer> = ({
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
    let newSelectedData: string[] = [...currentValue];
    // Add.
    if (checked.active)
      newSelectedData = [
        ...(currentValue as string[]),
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

  return (
    <>
      <div className="row:progress">{/* <ConsumerProgressIndicator /> */}</div>
      <div className="row:stepped-form">
        <Heading
          tag="h1"
          color="black"
          size="xlarge"
          className="stepped-form--title -mb-100"
        >
          {title}
        </Heading>
        <Choiceboxes
          className={`-cols-${
            choicesValues?.length < 3 ? 2 : 3
          } -teal stepped-form--choiceboxes`}
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
            It seems there is only 1 option available, please go back a step and
            change your selection to expand your choice
          </Text>
        )}
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
