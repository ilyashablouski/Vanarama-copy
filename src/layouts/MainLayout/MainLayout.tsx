/**
 * This is a helper component for the common layout container used on most pages.
 * We may find that some pages need a fluid layout so there could be multiple layouts in the future.
 */
const MainLayout: React.FC = ({ children }) => (
  <main className="page-template--main">{children}</main>
);

export default MainLayout;
