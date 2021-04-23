import { FC, useEffect, memo } from 'react';
import dynamic from 'next/dynamic';
import Accordion from 'core/molecules/accordion/Accordion';
import Skeleton from '../Skeleton';

const ArrowForwardSharp = dynamic(
  () => import('core/assets/icons/ArrowForwardSharp'),
  {
    ssr: false,
  },
);
const Link = dynamic(() => import('core/atoms/link'), {
  loading: () => <Skeleton count={2} />,
});

interface IJumpMenu {
  links: any[] | null | undefined;
  title: string | null | undefined;
}

const JumpMenu: FC<IJumpMenu> = ({ links, title }) => {
  useEffect(() => {
    const path = window.location.hash;
    if (path && path.includes('#')) {
      const id = path.replace('#', '');
      const el = window.document.getElementById(id);
      const r = el?.getBoundingClientRect();
      window.scrollTo({
        top: r?.top,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <div className="tilebox -mv-600">
      <Accordion
        items={[
          {
            id: 'jumpMenu',
            title: title || '',
            children: (
              <div className="-flex-column">
                {links?.map(({ label, url }) => (
                  <Link href={url} color="teal">
                    {`${label} `} <ArrowForwardSharp />
                  </Link>
                ))}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default memo(JumpMenu);
