import Text from '@vanarama/uibook/lib/components/atoms/text';
import { gql } from 'apollo-boost';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { AddressFormFieldsDropDownData } from '../../../generated/AddressFormFieldsDropDownData';
import useRemainingMonths from '../../hooks/useRemainingMonths';
import FCWithFragments from '../../utils/FCWithFragments';
import AddressSubForm from './AddressSubForm';
import { IAddressFormValues } from './interfaces';
import useUnorderedHistoryEntries from '../../hooks/useUnorderedHistoryEntries';
import useExtraneousHistoryEntries from '../../hooks/useExtraneousHistoryEntries';

interface IProps {
  dropDownData: AddressFormFieldsDropDownData;
}

const REQUIRED_MONTHS = 36;

const AddressFormFields: FCWithFragments<IProps> = ({ dropDownData }) => {
  const { control, watch } = useFormContext<IAddressFormValues>();
  const { append, fields, remove, swap } = useFieldArray({
    control,
    name: 'history',
  });

  const values = watch({ nest: true }).history;
  const remainingMonths = useRemainingMonths(values, REQUIRED_MONTHS);
  const extraneous = useExtraneousHistoryEntries(values, REQUIRED_MONTHS);
  const unordered = useUnorderedHistoryEntries(values);

  useDeepCompareEffect(() => {
    // Only one array function can be called at a time - see https://react-hook-form.com/api#useFieldArray
    const allDatesCompleted = values.every(x => x.month && x.year);
    if (allDatesCompleted && remainingMonths) {
      append({ address: '', month: '', status: '', year: '' });
      return;
    }

    if (extraneous.length) {
      remove(extraneous);
      return;
    }

    if (unordered.length) {
      swap(unordered[0][0], unordered[0][1]);
    }
    /**
     * NOTE: append, remove, swap are not included here because they change on every render
     * and this causes multiple tiles to be appended
     */
  }, [extraneous, remainingMonths, unordered, values]);

  return (
    <>
      {fields.map((field, index) => {
        const isLastEntry = index === fields.length - 1;
        const hasMultipleEntries = fields.length > 1;
        return (
          <React.Fragment key={field.id}>
            {isLastEntry && remainingMonths > 0 && hasMultipleEntries && (
              <Text tag="span" size="regular" color="darker">
                We need another {remainingMonths} months of address history.
              </Text>
            )}
            <AddressSubForm dropDownData={dropDownData} index={index} />
          </React.Fragment>
        );
      })}
    </>
  );
};

AddressFormFields.fragments = {
  dropDownData: gql`
    fragment AddressFormFieldsDropDownData on DropDownType {
      ...AddressSubFormDropDownData
    }
    ${AddressSubForm.fragments.dropDownData}
  `,
};

export default AddressFormFields;
