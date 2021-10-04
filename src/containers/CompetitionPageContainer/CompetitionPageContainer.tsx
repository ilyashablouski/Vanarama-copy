import * as toast from 'core/atoms/toast/Toast';
import Breadcrumbs from 'core/atoms/breadcrumbs-v2';
import CompetitionHeroSection from '../CompetitionLandingPageContainer/sections/CompetitionHeroSection';
import { GenericPageQuery_genericPage_sections as Section } from '../../../generated/GenericPageQuery';
import CompetitionTypeSection from './sections/CompetitionTypeSection';
import CompetitionFormSection from './sections/CompetitionFormSection';

interface IProps {
  sections: Section | null | undefined;
  breadcrumbsData: any;
}

export const handleNetworkError = () =>
  toast.error(
    'Sorry there seems to be an issue with your request. Pleaser try again in a few moments',
    '',
  );

const CompetitionPageContainer = ({ sections, breadcrumbsData }: IProps) => {
  const hero = sections?.hero;
  const leadText = sections?.leadText;
  const featured1 = sections?.featured1;
  const featured2 = sections?.featured2;
  const rowText = sections?.rowText;

  const breadcrumbsItems = breadcrumbsData?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <>
      {hero && <CompetitionHeroSection {...hero} />}
      {breadcrumbsItems && (
        <div className="row:title -mt-200">
          <Breadcrumbs items={breadcrumbsItems} />
        </div>
      )}
      {leadText && <CompetitionTypeSection {...leadText} />}
      {featured1 && <CompetitionFormSection {...featured1} />}
      {rowText && (
        <CompetitionTypeSection
          {...rowText}
          link1={featured1?.link}
          link2={featured2?.link}
        />
      )}
    </>
  );
};

export default CompetitionPageContainer;
