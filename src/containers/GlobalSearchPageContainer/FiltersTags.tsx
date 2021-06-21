import Button from 'core/atoms/button';

interface IProps {
  tags: string[];
}
const FiltersTags = ({ tags }: IProps) => {
  return (
    <div className="srp-f-tags">
      {tags.map(tag => (
        <Button withoutDefaultClass>{tag}</Button>
      ))}
    </div>
  );
};

export default FiltersTags;
