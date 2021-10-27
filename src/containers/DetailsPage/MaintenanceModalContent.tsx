import dynamic from 'next/dynamic';
import Cookies from 'js-cookie';
import Ellipse from 'core/assets/icons/Ellipse';
import EllipseOutline from 'core/assets/icons/EllipseOutline';
import Heading from 'core/atoms/heading';
import { includedItems, notIncludedItems } from './config';
import Skeleton from '../../components/Skeleton';
import { isUpdatedServicePlanFeatureFlagEnabled } from '../../utils/helpers';

const Text = dynamic(() => import('core/atoms/text'));
const IconList = dynamic(() => import('core/organisms/icon-list'), {
  loading: () => <Skeleton count={3} />,
});
// @ts-ignore
const IconListItem = dynamic(() =>
  import('core/organisms/icon-list').then(mod => mod.IconListItem),
);

const MaintenanceModalContent = () => {
  const updatedIncludedItems = isUpdatedServicePlanFeatureFlagEnabled(Cookies)
    ? [
        {
          value: 'RAC Accident Assist',
        },
        ...includedItems,
      ]
    : includedItems;
  return (
    <>
      <Text tag="p" color="dark" className="-mv-400" size="regular">
        We know how important it is to keep you moving and keep your vehicle on
        the road which is why we introduced the Vanarama Service Plan. The Plan
        covers all routine servicing & maintenance but also provides full RAC
        Breakdown Cover and a 7-day relief vehicle if you break down for a
        hassle-free, fixed monthly charge so you don’t have to worry about a
        thing!
      </Text>

      <Heading tag="span" color="black">
        What’s Included?
      </Heading>
      <IconList className="maintenanceConditions">
        {updatedIncludedItems.map(({ value, innerItems }, index) => (
          <IconListItem
            iconColor="dark"
            key={index.toString()}
            listIcon={<Ellipse />}
          >
            <Text tag="span" color="dark" size="regular">
              {value}
              {innerItems && (
                <IconList>
                  {innerItems?.map((text, idx) => (
                    <IconListItem
                      iconColor="dark"
                      key={idx.toString()}
                      listIcon={<EllipseOutline />}
                    >
                      <Text tag="span" color="dark" size="regular">
                        {text}
                      </Text>
                    </IconListItem>
                  ))}
                </IconList>
              )}
            </Text>
          </IconListItem>
        ))}
      </IconList>
      <Heading tag="span" color="black">
        What’s Not Included?
      </Heading>
      <IconList className="maintenanceConditions">
        {notIncludedItems.map((value, index) => (
          <IconListItem
            iconColor="dark"
            key={index.toString()}
            listIcon={<Ellipse />}
          >
            <Text tag="span" color="dark" size="regular">
              {value}
            </Text>
          </IconListItem>
        ))}
      </IconList>
    </>
  );
};

export default MaintenanceModalContent;
