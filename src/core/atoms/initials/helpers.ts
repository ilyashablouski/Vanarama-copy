const getInitials = (fullName: string) =>
  fullName
    .match(/(^\S\S?|\b\S)?/g)
    ?.join('')
    .match(/(^\S|\S$)?/g)
    ?.join('')
    .toUpperCase();

export default getInitials;
