declare module 'react-responsive-masonry' {
  interface ResponsiveMasonryPropTypes {
    columnsCountBreakPoints: {
      [key: number]: number;
    };
  }

  interface MasonryPropTypes {
    columnsCount: number;
    gutter: string;
  }

  export const ResponsiveMasonry: React.FC<ResponsiveMasonryPropTypes>;
  const Masonry: React.FC<MasonryPropTypes>;
  export default Masonry
}
