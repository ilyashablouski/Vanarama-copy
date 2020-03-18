interface IGridProps {
  columns: number;
  columnsLg?: number;
  columnsSm?: number;
}

interface IColumnsProps {
  span: number;
  spanLg?: number;
  spanSm?: number;
}

export const Grid: React.FC<IGridProps> = (props) => {
  const { children, columns, columnsLg, columnsSm } = props;

  const attrs = {
    ...(columns && { columns }),
    ...(columnsLg && { ['columns-l']: columnsLg }),
    ...(columnsSm && { ['columns-s']: columnsSm }),
  };

  return (
    <div className="grid" {...attrs}>
      {children}
    </div>
  );
};

export const Column: React.FC<IColumnsProps> = (props) => {
  const { children, span, spanLg, spanSm } = props;

  const attrs = {
    ...(span && { span }),
    ...(spanLg && { ['span-l']: spanLg }),
    ...(spanSm && { ['span-s']: spanSm }),
  };
  return (
    <div className="column" {...attrs}>
      {children}
    </div>
  );
};
