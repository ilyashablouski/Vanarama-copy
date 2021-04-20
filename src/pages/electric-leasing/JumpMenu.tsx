import { FC, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Accordion from 'core/molecules/accordion/Accordion';
import Skeleton from '../../components/Skeleton';

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
  links: { label: string; target: string }[];
  title: string;
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
            title,
            children: (
              <div className="-flex-column">
                {links.map(({ label, target }) => (
                  <Link href={target} color="teal">
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

export default JumpMenu;
