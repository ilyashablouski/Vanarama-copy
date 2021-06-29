import React from 'react';

interface INewLeaseOfLifePriceHeader {
  title?: string | null;
  body?: string | null;
}

const wrapSpanAroundString = (text: string) => {
  const array: any = text.split(' ');
  const string = array.find((phrase: string) => phrase.includes('£'));
  const index = array.indexOf(string);
  array[index] = `<span data-testid="price">${string}</span>`;
  if (string?.includes('+')) {
    const newString = string.slice(0, -1);
    array[index] = `<span data-testid="price">${newString}</span>+`;
  }
  return array.join(' ');
};

const NewLeaseOfLifePriceHeader = ({
  title,
  body,
}: INewLeaseOfLifePriceHeader) => {
  const heroBody = (
    <h2
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: wrapSpanAroundString(body || ''),
      }}
    />
  );
  return (
    <div className="nlol nlol-higlighted-price" style={{ left: 'auto' }}>
      <p>{title}</p>
      {heroBody}
    </div>
  );
};

export default NewLeaseOfLifePriceHeader;
