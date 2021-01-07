import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { MockedProvider } from '@apollo/client/testing';
import { screen, render, waitFor } from '@testing-library/react';
import VehicleReviewContainer from '../VehicleReviewContainer';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
  }),
}));
jest.mock('../../../hooks/useMediaQuery');

// ARRANGE
const METADATA = {
  title: 'Citroen Berlingo Van Review - Vanarama',
  metaRobots: null,
  metaDescription:
    'Read our in-depth, expert review of the Citroen Berlingo. The Vanarama roadtest looks at driving experience, competitors, cabin comfort and much more.',
  publishedOn: null,
  legacyUrl:
    'https://www.vanarama.com/van-reviews/citroen-berlingo-review.html',
  pageType: 'Vehicle Review',
  __typename: 'Meta',
};
const BODY =
  "## Expert Review↵ ↵↵Guess what? [Citroen](https://beta.vanarama.com/citroen-van-leasing.html) have released ANOTHER Berlingo (hold on let's just count how many there are) yep, this will be the third generation Berlingo. But this time it's back and it's better. Vanarama's Tia Richards reports. ↵↵We know what you're thinking… haven't we already reviewed the new-gen Berlingo? Yes, you're right, but this time we got to drive it all the way to Birmingham, so rest assured because we know what we're talking about.↵↵↵## Happy To Be Handled↵↵Before you make any assumptions, let's just clarify were talking about a van and how it handles the road.↵↵Right, now that we've cleared that up here's our thoughts on how it felt sitting in the driving seat. ↵↵So, as I mentioned earlier, we drove the all-new [Citroen Berlingo](https://beta.vanarama.com/citroen-van-leasing/berlingo.html) (Worker configuration) van to Birmingham for fun… joking, it was for work purposes, obviously. We decided it would be a great idea to see how the van handles the road on long journeys. ↵↵We should probably tell you why we travelled down to Birmingham, we were guests of a media day for The Commercial Vehicle show. If you want to know all about our day trip have a read of our blog to get the low-down on [what's happening at this year's CV Show](https://beta.vanarama.com/latest-news/everything-we-know-about-the-2019-commercial-vehicle-show.html). ↵↵Anyway, sorry to keep you in suspense, but you know what they say good news is worth waiting for.↵↵ ↵## The Road Test ↵↵The Citroen Berlingo did not disappoint. We had high expectations for the small van, but it exceeded them effortlessly. ↵↵To give you an idea of how seamless the drive was, lets compare the Berlingo's performance on the road to a bowl of soup. Every mouthful you chug back is smooth and velvety, lovely stuff. And that's what the journey was, smooth and steady. ↵↵But we give no credit to the M6 motorway, because frankly it's the most confusing motorway I've ever been on. Me and my co-passenger Tom Roberts both agree that the M6 should invest in some more signs… can we put in a colour scheme suggestion? We think bright yellow would be a suitable colour. ↵↵Not only did the Berlingo show us that it was a suitable small van for long distance motorway travelling, it also proved to be more than capable on winding country roads. We would love to say that we decided to take the more scenic route by choice, but fact is we got a little bit lost on the way back. But the good news is, the Berlingo snaked in and out of bends with tremendous grip.↵↵ ↵## The Energetic Engine ↵↵Our tried and tested 1.5-litre engine certainly was sprightly. ↵↵But the acceleration power was short lived. The rev count seemed to be impressive in the third and fourth gears but the pulling power disappeared when we shifted up to fifth gear. We literally put the pedal to the metal, but the Berlingo didn't seem to pick up speed… ↵↵The Citroen Berlingo isn't about being powerful, it's built for work not rally racing, so let's give it credit for being a VERY efficient van for fuel and CO2. If you're after a fast vehicle the last thing you're going to be looking at is a small van? ↵↵The Citroen Berlingo may be a small van, but it certainly doesn't mind racking the miles up on the motorway. Our journey used less than a quarter of diesel from its 1.5-litre tank. On our 170-mile trip to Birmingham and back we didn't need to stop for fuel, (we were just as shocked as you are). ↵↵And, the manufacturer stated emissions for an engine of this size (BlueHDi 130) is 113-116g/km… if you're not familiar with emissions, believe us when we say that's impressive. This isn't the only engine available for the Citroen Berlingo van. The choice is yours, diesel or petrol?↵ ↵↵### Diesel engines↵↵ ↵- BlueHDi 75, 75bhp – 1.6 litre ↵- BlueHDi 100, 99bhp – 1.6-litre ↵- Or go with our BlueHDi 130, 131bhp – 1.5-litre ↵ ↵↵### Petrol engine:↵↵ ↵- PureTech 110, 110bhp – 1.2-litre ↵ ↵↵Whatever engine you choose you can count on the Citroen Berlingo for fuel economy and low emissions.↵↵ ↵## Loads Of Load Space↵↵Now, the Berlingo might be a small van but its load space has got A LOT to offer. Want to know how much it can fit in that hefty payload? Well, it will depend on what size you pick. If your stuck here's a bit of advice, size does matter.↵↵If you want to make the most out of its backend the XL (L2) body length is the most fitting. Its cargo bed measures 2167mm in length, but the payload isn't as weighty as the M (L1) model. The XL loading capacity is benchmarked at 970kg, which is still great for a small van but it's rather bizarre that the longer version doesn't have a bulkier loading capacity. ↵↵So, we've clarified that the M version should be your first choice if you need to carry heavier loads (1050kg payload) but, the XL configuration does have its uses, it's longer. The M body for the Berlingo draws the short straw when it comes to its length, it measures to 1817mm. ↵↵Longer the better? You decide… ↵↵Oh, we should also mention that you've got the option of one or two sliding doors on the side of the van and a double doored opening to the cargo bed at the back. If you want it! ↵↵But we've saved the best till last… there's lots of features that assist you when your securing loads in the back, including:↵ ↵- Load securing rings ↵- Enhanced LED lighting ↵- 12v power socket ↵ ↵And, an overload indicator, which basically warns you if you've exceeded the weight of the payload.↵↵ ↵## The Berlingo Cabin↵↵A small van that lends a hand, that's how we describe the Berlingo when you take a look at its cabin. ↵↵There are four trim levels to choose from: X, Enterprise, Driver and Worker (the one we had). It's a hard choice because they all include an appealing set of interior specs. ↵↵It would take us a while to name all the features in the different trim specs. But we think you should take note of these far from average attributes that make it the perfect mobile office.↵ ↵- 220v charging socket ↵- Pivoting writing table ↵- Soundproofed cabin ↵- 113 litres of storage space↵ ↵↵And, if you think you're spoilt for choice by the Berlingo's trims wait until you get a load of the long list of driver assistance features. You might remember we named them in our previous review. But we think that naming them again will reiterate how impressive the 20 features are… yes there's 20!↵↵ ↵1. Surround rear vision ↵2. Colour head up display ↵3. Adaptive cruise control ↵4. Active lane departure warning ↵5. Extended traffic sign recognition and recommendation↵6. Distance alert ↵7. Active safety brake ↵8. Coffee break alert ↵9. Driver attention alert↵10. Blind spot monitoring system ↵11. Grip control with hill decent assist ↵12. Trailer stability control ↵13. Keyless entry and start ↵14. Automatic electronic parking brake ↵15. Hill start assist ↵16. Intelligent beam headlights ↵17. Cornering light function ↵18. Reversing camera ↵19. Front, rear and side parking sensors ↵20. Overload indicator↵ ↵↵Don't say we didn't warn you, we told you the list was long. The Citroen Berlingo cabin makes this small van the man for all business matters.↵↵ ↵## Our Verdict ↵↵The Citroen Berlingo van is compact, but it doesn't lack capability. Don't doubt this small van because it can be the workhorse you want it to be. Motorway or country lanes, it gets to grips with any road. And, the payload is exceptional for a small van, its cabin isn't too shabby either. Why wouldn't you want to lease a new Citroen Berlingo van?↵↵[Latest Deals](https://beta.vanarama.com/citroen-van-leasing/berlingo.html)";

const SECTIONS = {
  __typename: 'ReviewsPageSections',
  link: {
    __typename: 'Link',
    text: 'Latest Deals',
    url: '/van-leasing/citroen/berlingo',
  },
  rowText: {
    __typename: 'RowText',
    heading: 'Get Your Free Quote',
    titleTag: 'h2',
    link: {
      __typename: 'Link',
      text: 'Get Quote',
      url: '/van-leasing/citroen/berlingo',
    },
  },
  vehicleReviewMedia: {
    __typename: 'VehicleReviewMedia',
    reviewPhoto: {
      __typename: 'Image',
      file: {
        __typename: 'File',
        url:
          '//images.ctfassets.net/3xid768u5joa/1ufFnJNOsfjenEKcmSUeXt/f0978cb49686d6466600a17ea0d6d0e9/berlingo-outside.jpg',
      },
    },
  },
  vehicleReview: {
    __typename: 'VehicleReview',
    reviewType: 'Expert',
    rating: '4.5',
    summary:
      'The Citroen Berlingo small van is compact & capable - it also won a tonne of awards on launch. Generous spec & powerful engines round off one of the best small vans on the market right now.',
    author: [
      {
        __typename: 'Author',
        name: 'Tom Roberts',
        avatar: null,
      },
    ],
  },
  reviews: {
    __typename: 'Reviews',
    reviews: [
      {
        __typename: 'VehicleReview',
        reviewType: 'Customer',
        rating: '5',
        summary:
          "Very nice van throughout, although a little disappointing that the sport doesn't come with alloys as standard as it would look a lot nicer.",
        customerName: 'Nathan Collings',
      },
      {
        __typename: 'VehicleReview',
        reviewType: 'Customer',
        rating: '4',
        summary: 'Bigger than the last model but very easy to drive.',
        customerName: 'Susan Pridie',
      },
      {
        __typename: 'VehicleReview',
        reviewType: 'Customer',
        rating: '5',
        summary: 'Good value for money. ',
        customerName: 'Martin Armstrong',
      },
      {
        __typename: 'VehicleReview',
        reviewType: 'Customer',
        rating: '4',
        summary: 'Nice little van with lots of features.',
        customerName: 'Ruth Whittaker',
      },
      {
        __typename: 'VehicleReview',
        reviewType: 'Customer',
        rating: '5',
        summary:
          'We have been using Berlingo vans for several years now & always found them to be good reliable & efficient vans. The new model has been updated with better driver experience with things like a decent sized screen with plug & play which is very handy. ',
        customerName: 'Marco Fernandes',
      },
      {
        __typename: 'VehicleReview',
        reviewType: 'Customer',
        rating: '5',
        summary: 'Not the best in town but great for our budget!',
        customerName: 'Adam Beebee',
      },
      {
        __typename: 'VehicleReview',
        reviewType: 'Customer',
        rating: '5',
        summary:
          "Too early to say, initial impression is that is quite well spec'd. ",
        customerName: 'John James',
      },
      {
        __typename: 'VehicleReview',
        reviewType: 'Customer',
        rating: '5',
        summary: 'Very good so far.',
        customerName: 'Robert Miles-Barnard',
      },
      {
        __typename: 'VehicleReview',
        reviewType: 'Customer',
        rating: '5',
        summary: 'Early days yet but is saving me on fuel!',
        customerName: 'Michael Wardle',
      },
    ],
  },
} as any;

describe('<VehicleReviewContainer />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('should match snapshot', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider addTypename={false}>
        <VehicleReviewContainer
          sections={SECTIONS}
          title={METADATA.title}
          body={BODY}
          breadcrumbsItems={null}
        />
      </MockedProvider>,
    );
    // ASSERT
    await waitFor(() => {
      expect(screen.getByText(`Nathan Collings`)).toBeInTheDocument();
    });

    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
});
