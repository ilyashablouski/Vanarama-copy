export default interface FCWithFragments<P> extends React.FC<P> {
  fragments: { [K in keyof P]?: any };
}
