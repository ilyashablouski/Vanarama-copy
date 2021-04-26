import { NextPage } from 'next';
import CompetitionPageContainer from '../../../containers/CompetitionPageContainer/CompetitionPageContainer';
import { GetInsuranceLandingPage } from '../../../../generated/GetInsuranceLandingPage';
import { decodeData, encodeData } from '../../../utils/data';
import data from './temporary_hardcoded_page_data.json';

interface IWinANewLeaseOfLifePagePage {
  data: GetInsuranceLandingPage | undefined;
}

const WinANewLeaseOfLifePage: NextPage<IWinANewLeaseOfLifePagePage> = ({
  data: encodedData,
}) => {
  return <CompetitionPageContainer data={decodeData(encodedData)} />;
};

export async function getStaticProps() {
  try {
    return {
      props: {
        data: encodeData(data),
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}

export default WinANewLeaseOfLifePage;
