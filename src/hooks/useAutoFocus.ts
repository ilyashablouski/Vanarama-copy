const useAutoFocus = (numOfFields: number) => {
  return {
    handleAutoFocus: (event: {
      target: { maxLength: number; value: string; name: string };
    }) => {
      const { maxLength, value, name } = event.target;
      const [fieldName, fieldIndex] = name.split('-');

      if (value.length >= maxLength) {
        // Check if it's not the last input field
        if (parseInt(fieldIndex, 10) < numOfFields) {
          // Get the next input field
          const nextSibling = document.querySelector<HTMLElement>(
            `input[name=${fieldName}-${parseInt(fieldIndex, 10) + 1}]`,
          );

          // If found, focus the next field
          if (nextSibling !== null) {
            nextSibling.focus();
          }
        }
      }
    },
  };
};

export default useAutoFocus;
