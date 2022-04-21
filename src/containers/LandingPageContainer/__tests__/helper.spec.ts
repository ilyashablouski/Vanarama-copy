import { buildRenderArray } from '../helpers';

const sectionsAsArray = {
  accordion: null,
  cards: null,
  carousel: null,
  faqs: null,
  featured: [
    {
      __typename: 'Featured',
      body:
        'If you’re after a new car, you’ve come to the right place. Here at Vanarama we do things a little differently. We’ll help you choose the best car for your needs without hitting you over the head with a load of car jargon or trying to push you towards a particular model that’s not absolutely perfect for you. \n\nWe’ll guide you through everything you could possibly need to think about when choosing your next car so that, by the time we’re done, there’ll be no doubt in your mind that you’ve made the right choice and you might just be surprised at the incredible cars that leasing makes affordable, so you really can drive that car you want, not just the one you need!.\n',
      cards: null,
      defaultHeight: null,
      iconList: null,
      image: null,
      layout: ['Media Left'],
      link: null,
      targetId: null,
      testimonials: null,
      title: null,
      titleTag: null,
      video: null,
    },
    {
      __typename: 'Featured',
      body:
        'If you’re after a new car, you’ve come to the right place. Here at Vanarama we do things a little differently. We’ll help you choose the best car for your needs without hitting you over the head with a load of car jargon or trying to push you towards a particular model that’s not absolutely perfect for you. \n\nWe’ll guide you through everything you could possibly need to think about when choosing your next car so that, by the time we’re done, there’ll be no doubt in your mind that you’ve made the right choice and you might just be surprised at the incredible cars that leasing makes affordable, so you really can drive that car you want, not just the one you need!.\n',
      cards: null,
      defaultHeight: null,
      iconList: null,
      image: null,
      layout: ['Media Left'],
      link: null,
      targetId: null,
      testimonials: null,
      title: null,
      titleTag: null,
      video: null,
    },
  ],
  hero: null,
  iconBullets: null,
  jumpMenu: [
    {
      __typename: 'JumpMenu',
      links: [
        {
          __typename: 'Link',
          label: 'Set Your Budget',
          text: 'Set Your Budget',
          url: '#set-your-budget',
        },
      ],
      position: 2,
      title: 'Everything You Need To Know',
    },
  ],
  leadText: [
    {
      __typename: 'LeadText',
      description: 'test',
      heading: 'Help Me Choose Tool',
      position: 1,
      titleTag: null,
      link: null,
    },
    {
      __typename: 'LeadText',
      description: null,
      heading: 'Choose from our wide range of electric and hybrid options',
      position: 4,
      titleTag: 'h2',
      link: null,
    },
  ],
  questionSet: null,
  reviews: null,
  rowText: null,
  steps: null,
  tiles: null,
  glossaryGrid: null,
};

const expectedArray = [
  {
    __typename: 'Featured',
    blockName: 'featured',
    body:
      'If you’re after a new car, you’ve come to the right place. Here at Vanarama we do things a little differently. We’ll help you choose the best car for your needs without hitting you over the head with a load of car jargon or trying to push you towards a particular model that’s not absolutely perfect for you. \n\nWe’ll guide you through everything you could possibly need to think about when choosing your next car so that, by the time we’re done, there’ll be no doubt in your mind that you’ve made the right choice and you might just be surprised at the incredible cars that leasing makes affordable, so you really can drive that car you want, not just the one you need!.\n',
    cards: null,
    defaultHeight: null,
    iconList: null,
    image: null,
    layout: ['Media Left'],
    link: null,
    targetId: null,
    testimonials: null,
    title: null,
    titleTag: null,
    video: null,
  },
  {
    __typename: 'LeadText',
    blockName: 'leadText',
    description: 'test',
    heading: 'Help Me Choose Tool',
    position: 1,
    titleTag: null,
    link: null,
  },
  {
    __typename: 'JumpMenu',
    blockName: 'jumpMenu',
    links: [
      {
        __typename: 'Link',
        label: 'Set Your Budget',
        text: 'Set Your Budget',
        url: '#set-your-budget',
      },
    ],
    position: 2,
    title: 'Everything You Need To Know',
  },
  {
    __typename: 'Featured',
    blockName: 'featured',
    body:
      'If you’re after a new car, you’ve come to the right place. Here at Vanarama we do things a little differently. We’ll help you choose the best car for your needs without hitting you over the head with a load of car jargon or trying to push you towards a particular model that’s not absolutely perfect for you. \n\nWe’ll guide you through everything you could possibly need to think about when choosing your next car so that, by the time we’re done, there’ll be no doubt in your mind that you’ve made the right choice and you might just be surprised at the incredible cars that leasing makes affordable, so you really can drive that car you want, not just the one you need!.\n',
    cards: null,
    defaultHeight: null,
    iconList: null,
    image: null,
    layout: ['Media Left'],
    link: null,
    targetId: null,
    testimonials: null,
    title: null,
    titleTag: null,
    video: null,
  },
  {
    __typename: 'LeadText',
    blockName: 'leadText',
    description: null,
    heading: 'Choose from our wide range of electric and hybrid options',
    position: 4,
    titleTag: 'h2',
    link: null,
  },
];

describe('<helpers />', () => {
  it('should work with value', async () => {
    expect(buildRenderArray(sectionsAsArray)).toEqual(expectedArray);
  });
});
