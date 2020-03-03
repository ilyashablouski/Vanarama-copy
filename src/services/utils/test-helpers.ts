export function findForm(wrapper) {
  return wrapper.find('form');
}

export function fillInputField(wrapper: any, fieldId: string, props: object) {
    const inputField = findForm(wrapper).find('#' + fieldId).first();
    inputField.props().handleChange({ currentTarget: props, preventDefault: () => { } });
}
