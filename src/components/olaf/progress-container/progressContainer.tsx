import Router from 'next/router';
import ProgressIndicator from '@vanarama/uibook/src/components/molecules/progress-indicator';

interface IProgressContainerProps {
  activeStep: number;
}

const ProgressContainer: React.FC<IProgressContainerProps> = ({
  activeStep,
  children,
}) => {
  const steps = [
    { label: 'About You', route: '/about' },
    { label: 'Address History', route: '/address' },
    { label: 'Employment History', route: '/employment' },
    { label: 'Expenses', route: '/expense' },
    { label: 'Details', route: '/details' },
    { label: 'Summary', route: '/summary' },
  ];

  return (
    <>
      <section>
        <div className="container">
          <ProgressIndicator
            steps={steps}
            activeStep={activeStep}
            onRoute={(route) => Router.push(route)}
          />
        </div>
      </section>
      <section>
        <div className="container">{children}</div>
      </section>
    </>
  );
};

export default ProgressContainer;
