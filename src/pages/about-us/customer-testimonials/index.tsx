import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import { useQuery } from '@apollo/client';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Tile from '@vanarama/uibook/lib/components/molecules/tile';
import withApollo from '../../../hocs/withApollo';
import { TESTIMONIALS_DATA } from '../../../gql/testimonials';
import {
  TestimonialsData,
  TestimonialsData_testimonials as TestimonialData,
} from '../../../../generated/TestimonialsData';

export const CustomerTestimonialPage: NextPage = () => {
  const { data, loading, error } = useQuery<TestimonialsData>(
    TESTIMONIALS_DATA,
    {
      variables: { size: 4, page: 1 },
    },
  );

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div className="page:testimonials">
      <div className="testimonials--content">
        <Heading size="xlarge" color="black">
          Testimonials Hub
        </Heading>
        {data?.testimonials?.map((item: TestimonialData | null) =>
          JSON.stringify(item),
        )}
      </div>
      <div className="testimonials--sidebar">...</div>
      <div className="row:bg-lighter">
        <div className="row:features-4col">
          <Heading size="large" color="black">
            Why Choose Vanarama?
          </Heading>
          {[1, 2, 3, 4].map(t => (
            <div key={t}>
              <Tile className="-plain -button -align-center" plain>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Image
                    inline
                    round
                    size="large"
                    src=" https://source.unsplash.com/collection/2102317/1000x650?sig=403411"
                  />
                </div>
                <a className="tile--link" href="##">
                  <Heading tag="span" size="regular" color="black">
                    Lorem Ipsum Dolor
                  </Heading>
                </a>
                <Text tag="p">
                  Pretium facilisi etiam pretium, cras interdum enim, nullam.
                </Text>
              </Tile>
            </div>
          ))}
        </div>
      </div>
      <div className="row:text">...</div>
    </div>
  );
};

export default withApollo(CustomerTestimonialPage, { getDataFromTree });
