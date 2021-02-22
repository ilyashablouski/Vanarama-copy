import { getBlogPaths } from '../pageSlugs';
import { BlogPosts_blogPosts as IBlogPosts } from '../../../generated/BlogPosts';

describe('pageSlugs', () => {
  const blogData = {
    blogPosts: {
      metaData: {
        title:
          'Competition Results | Vanarama Blog | Van, Industry & Company News | Vanarama',
        name: null,
        metaRobots: null,
        metaDescription: null,
        legacyUrl: '/latest-news/category/competition-results.html',
        pageType: 'Article Category',
        canonicalUrl:
          'https://www.vanarama.com/latest-news/category/competition-results.html',
        slug: 'blog/competition-results',
        schema: {
          '@type': 'BreadcrumbList',
          '@context': 'https://schema.org',
          itemListElement: [
            {
              item: 'https://www.vanarama.com/',
              name: 'Home',
              '@type': 'ListItem',
              position: 1,
            },
            {
              item: 'https://www.vanarama.com/latest-news.html',
              name: 'Latest News',
              '@type': 'ListItem',
              position: 2,
            },
            {
              name: 'Competition Results',
              '@type': 'ListItem',
              position: 3,
            },
          ],
        },
        publishedOn: null,
        breadcrumbs: [
          {
            href: '/',
            label: 'Home',
          },
          {
            href: 'https://www.vanarama.com/latest-news.html',
            label: 'Latest News',
          },
          {
            label: 'Vanarama National League',
          },
        ],
      },
      sections: {
        leadText: null,
        cards: null,
        carousel: null,
        tiles: null,
      },
      pageTitle:
        'Competition Results | Vanarama Blog | Van, Industry & Company News',
      articles: [
        {
          intro: null,
          name: 'Matthew Newton is the #VanaramaUltimateFan',
          publishedOn: '2016-05-17',
          excerpt: null,
          featuredImage: {
            file: {
              url:
                '//images.ctfassets.net/3xid768u5joa/6k2u1oLZAc3X4IzQASX7mB/0191e5f8f08443b7de5f31a028693691/winner.jpg',
            },
          },
          isFeatured: true,
          title: 'VanaramaUltimateFan2016 | Vanarama',
          tags: null,
          slug: 'blog/national-league/vanaramaultimatefan2016.html',
          body:
            "Grimsby Town fan Matthew Newton (pictured second from the left) was selected as the #VanaramaUltimateFan from over 300 entries and presented the National League trophy to his team at Wembley Stadium.\n\nIt was an emotional day for Matthew. As well as seeing his beloved Mariners beat Forest Green Rovers 3-1 to clinch promotion, he presented the trophy to Craig Disley, in honour of his friend Rich Broadley who passed away from Leukaemia aged 20.\n\n## Remembering Rich Broadley\n\nMatthew explained: \"Rich didn't have a chance to see us back in the football league, so it was the greatest honour to present the trophy to Grimsby Town in memory of him.\"\n\nHe is already doing a lot to continue the memory of Rich, having created a football club for him - [Broadley FC](https://www.facebook.com/Broadley-FC-442977482464676/?fref=ts). They're sponsored by fellow Grimsby Town fan and US TV star, Adam Richman.\n\n## Celebrating with the players and manager\n\nMatthew's prize as the #VanaramaUltimateFan also included a tour of Wembley Stadium before the game and hospitality in the Bobby Moore Suite. After the match he joined the players and manager Paul Hurst on for celebrations on the pitch.\n\nCongratulations to Matthew and Grimsby Town! \n",
          legacyUrl: '/latest-news/vanaramaultimatefan2016.html',
        },
        {
          intro: null,
          name:
            'Vanarama Conference half season ticket and signed shirt competition winners',
          publishedOn: '2014-12-30',
          featuredImage: {
            file: {
              url:
                '//images.ctfassets.net/3xid768u5joa/25CTjISL7XKdl8RFqGM5jS/91dbcbb073448a1dd1b7bc27b0bdb892/competition.jpg',
            },
          },
          isFeatured: null,
          title: 'Half season ticket and shirt winners | Vanarama',
          tags: null,
          slug: 'blog/vans/half-season-ticket-and-shirt-winners',
          body:
            "Firstly we'd like to wish all Vanarama Conference supporters a very merry Christmas and we hope you all have a great New Year. Thanks to you all for re-tweeting, favouriting and following Vanarama on Twitter to win a half season ticket and signed shirt for your club.\n\nOur team have scoured every post and gathered together all re-tweets and have randomly picked a winner for each team in all three divisions. Have a look at the table below to see if you're a winner, if you are, CONGRATULATIONS!\n\nWe will be contacting all winners shortly via a direct message on Twitter asking you to send us your full name, address and contact number. Over the coming days you will receive your season tickets and signed shirt. Please be patient as we have New Year in between so post may be slightly delayed as a result.\n\n | **Clubs** | **Twitter Handle** | **Twitter Name** |\n | AFC Fylde | @westleypack | Westley Pack |\n | AFC Telford United | @sieverton | Simon Everton |\n | Aldershot Town | @Jaday1966 | Julie-Ann day |\n | Alfreton Town | @philbretnall | Phil Bretnall |\n | Altrincham | @altyjord | Jordan Tyms |\n | Barnet | @tomburns24 | Tom Burns |\n | Barrow | @coltman88 | Lee Burton |\n | Basingstoke Town | @ohhaveaword | Claire |\n | Bath City | @Sheilb47 | Sheila Black |\n | Bishops Stortford | @CraigDellow | Craig Dellow |\n | Boreham Wood | @jdnicoll | James Nicoll |\n | Boston United | @Youngiecj | Youngie |\n | Brackley Town | @goodywfc | Steve Goodman |\n | Bradford Park Avenue | @JoeGarside1 | Joe Garside |\n | Braintree Town | @ytdaveyt | David White |\n | Bristol Rovers | @samchocolates | Sarah Merrifield |\n | Bromley | @gazzabill76 | Gary Bill |\n | Chelmsford City | @DavidRamsayafc | David Ramsey-Smith |\n | Chester | @bethlee\\_cfcx | Bethan Lee |\n | Chorley | @StuuStuu | Stuart Pilkington |\n | Colwyn Bay | @Glynsters68 | Glynny Jones |\n | Concord Rangers | @Darran\\_JL | Darran Leech |\n | Dartford | @garyskiphills | Gary Hills |\n | Dover Athletic | @JCB180 | James Bowman |\n | Eastbourne Borough | @Strickson33 | Jason Strickson |\n | Eastleigh | @CaraWeidner | Cara Weidner |\n | Ebbsfleet United | @oneill\\_88 | Liam O'Neill |\n | Farnborough | @Creeky01 | Adrian Creek |\n | FC Halifax Town | @wggilloxheys | Rob Gill |\n | Forest Green Rovers | @stevegriffin1 | Steve Griffin |\n | Gainsborough Trinity | @topcattlc | Tracey Cluett |\n | Gateshead FC | @AbbieBrownhill | Abbie Brownhill |\n | Gloucester City | @Ian\\_Soule | Ian Soule |\n | Gosport Borough | @MikeRees73 | Mike Rees |\n | Grimsby Town | @amby\\_92 | Ian Ambrose |\n | Guiseley | @anthony\\_gill1 | Anthony Gill |\n | Harrogate Town | @BahsonGav | Gavin Mills |\n | Havant & Waterlooville | @aaron\\_b1979 | Aaron Barnett |\n | Hayes & Yeading Utd | @\\_CoreyHYUFC | Corey |\n | Hednesford Town | @LizAshfield | Liz Ashfield |\n | Hemel Hempstead Town | @hurleyshane66 | Shane Hurley |\n | Hyde FC | @sta\\_legend | Pete Shaw |\n | Kidderminster Harriers | @PaulBayliss9 | Paul Bayliss |\n | Leamington | @CalcuttAndrew | Andrew Calcutt |\n | Lincoln City FC | @yatesyimp30 | Gavin Yates |\n | Lowestoft Town | @krampmek | Mark Kemp |\n | Macclesfield Town | @joeminiells | Joe Ellwood |\n | Maidenhead United | @MauriceCann | Maurice Cann |\n | North Ferriby United | @villager55 | Graham Smart |\n | Nuneaton Town | @DarrenJWilson1 | Darren Wilson |\n | Oxford City | @GazzHam | Gary Hamilton |\n | Solihull Moors | @sean\\_262 | Sean Dav |\n | Southport | @pauljobyrne | Paul O'Byrne |\n | St Albans City | @eames\\_jon | Jon Eames |\n | Staines Town | @MarkCourt147 | Mark Court |\n | Stalybridge Celtic | @gazculpin | Gareth Culpin |\n | Stockport County | @adamscfc23 | Adam Somerville |\n | Sutton United | @stewart5685 | Stewart Howe |\n | Tamworth | @a10an | Alan Fitzpatrick |\n | Torquay United | @JamesMurphy95 | James Murphy |\n | Wealdstone | @warrenladd | Warren Ladd |\n | Welling United | @Mark\\_Shuttle | Mark Shuttleworth |\n | Weston-Super-Mare | @BenRobinson7 | Ben Robinson |\n | Whitehawk | @wlvscirclewlvs | David Hunt |\n | Woking | @JamesTheBoss01 | James Hunt |\n | Worcester City | @garrymollart | Garry Mollart |\n | Wrexham | @adamandflynn | Adam Woodcock |\n\nIf you're name and Twitter handle is listed above then we'll be in touch with you via a direct message, you don't need to do anything until you hear from us requesting the information. Thanks again and have a great New Year!\n",
          legacyUrl: '/latest-news/half-season-ticket-and-shirt-winners.html',
        },
      ],
    },
  };
  it('getBlogPaths should filter slugs which includes .html', () => {
    const actual = getBlogPaths(blogData?.blogPosts as IBlogPosts);

    expect(actual).toEqual([
      {
        params: {
          articles: ['half-season-ticket-and-shirt-winners'],
        },
      },
    ]);
  });
});
