import React from 'react';
import renderer from 'react-test-renderer';
import FleetLandingPage from '../FleetLandingPage';
import { GET_FLEET_PAGE_CONTENT } from '../gql';
import { GetAboutUsPageData_aboutUsLandingPage as AboutUsLandingPage } from '../../../../generated/GetAboutUsPageData';

import { GetFleetLandingPage_fleetLandingPage as FleetPageData } from '../../../../generated/GetFleetLandingPage';
import { MockedResponse, MockedProvider } from '@apollo/client/testing';
import { TESTIMONIALS_DATA } from '../../../gql/testimonials';
import { TestimonialsData } from '../../../../generated/TestimonialsData';
import { screen, render, waitFor } from '@testing-library/react';

jest.mock('../gql');
// jest.mock('@vanarama/uibook/lib/components/organisms/form', () => () => {
//     return <div />;
// });
// jest.mock('../../sections/TestimonialSection.tsx', () => () => {
//     return <div />;
// });
// jest.mock('../../sections/SideMediaFeature.tsx', () => () => {
//     return <div />;
// });
// jest.mock('../../sections/LeadTextSection.tsx', () => () => {
//     return <div />;
// });
// jest.mock('../../sections/BenefitsSection.tsx', () => () => {
//     return <div />;
// });
// jest.mock('../../sections/Hero/HeroSection.tsx', () => () => {
//     return <div />;
// });
// jest.mock('../../sections/Hero/RequestCallBackForm.tsx', () => () => {
//     return <div />;
// });
// jest.mock('../../sections/Hero/RequestCallBackFormFields.tsx', () => () => {
//     return <div />;
// });

const mocked: MockedResponse[] = [
    {
        request: {
            query: TESTIMONIALS_DATA,
            variables: {
                page: 1,
                size: 1,
            },
        },
        result: {
            data: {
                testimonials: [
                    {
                        date: '2020-02-11',
                        name: 'Steven Buckle',
                        whyLease: 'Cheaper than buying',
                        comments:
                            "I can't really compare you with any of the other companies out there as I've not used them. I guess that speaks for itself!",
                        overallRating: 3.9,
                    },
                ],
            } as TestimonialsData,
        },
    },
    {
        request: {
            query: GET_FLEET_PAGE_CONTENT,
            variables: {
                page: 1,
                size: 1,
            },
        },
        result: {
            data: {
                fleetLandingPage: {
                    id: "1iXmVZNIGFolU38Jol4j08",
                    sections: {
                        featured1: {
                            title: "Wherever You Are, However You Want To Work, We're There For You",
                            titleTag: null,
                            body: "The prospect of managing a mixed fleet of multiple vehicles, on varied financial contracts, is daunting...but we'll take that away. Our dedicated team, and the platforms available to you and us, mean that running your mixed fleet is hassle-free.",
                            layout: [
                                "Media Right"
                            ]
                        },
                        featured2: {
                            title: "What's In It For My Business?",
                            titleTag: null,
                            body: "### Every fleet is different: \nYour fleet needs are unique and that's why entrusting yours to a company you trust is important.\n\n### Best price for your business:\nChoosing a fleet management company that works with a network of funders means they can provide the very best prices on the market first time.\n\n### Compliance as standard: \nDuty of care is a key concern and goes hand-in-hand with staying compliant. Driver risk assessments and safety checks need to be carried out on time and to high standards, so work with a company that understands how to keep you organised.\n",
                            image: null,
                            layout: [
                                "Media Left"
                            ]
                        },
                        featured3: {
                            title: "What's In It For Me?",
                            titleTag: null,
                            body: "### Hassle-free fleet reporting:\nFrom MOT notifications to duty of care compliance tasks, keeping information at your fingertips is vital to effective fleet management.\n\n### Protect your fleet: \nHaving your fleet managed and insured through one channel makes life less complicated for you.\n\n### Cost-effective fleet maintenance: \nEasy access to all routine servicing and repairs, tyre replacement, MOTs and vehicle breakdown cover is true peace-of-mind.\n\n### Sale and lease back: \nRemoving vehicles from outright purchase and into a lease agreement allows you to grow your business faster by giving you the option to invest cash into your business rather than the vehicles.\n\n### Controlling costs: \nA robust reporting platform will allow you to look at maintenance budgets, total driver costs and whole-life fleet costings at a moment's notice.",
                            image: {
                                title: "AudiQ30718 4 k5ojqt",
                                file: {
                                    url: "//images.ctfassets.net/3xid768u5joa/2QbzKD75ObIHIeVMzNeCF/1455166780ba4eb095c965e278a63b69/AudiQ30718_4_k5ojqt.jpg"
                                }
                            },
                            layout: [
                                "Media Right"
                            ]
                        },
                        featured4: {
                            title: "What's In It For The Drivers?",
                            titleTag: null,
                            body: "### Maintenance when it's needed: \nNo matter which maintenance package you choose, the drivers themselves can arrange bookings through the Driverhelpline application or by calling the support team.\n\n### Comprehensive vehicle management: \nHow great would it be if drivers knew that support was just a tap on an app away? They'll benefit from the same up-to-date reporting and service-on-demand functions as you. Drivers know they're being compliant, and you can rest easy.\n\n### Peace of mind and support:\nFor drivers, the fleet management relationship shouldn't be centred on vehicle delivery, they want support. And they'll have questions they need answered. That's when having a dedicated app filled with the information they need, and a dedicated support team really will pay for itself.",
                            image: null,
                            layout: [
                                "Media Left"
                            ]
                        },
                        leadText: {
                            heading: "Why You Should Trust Your Fleet With Vanarama",
                            titleTag: null,
                            description: "The prospect of managing a mixed fleet of multiple vehicles, on varied financial contracts, is daunting...but we'll take that away. Our dedicated team, and the platforms available to you and us, mean that running your mixed fleet is hassle-free"
                        },
                        hero: {
                            title: "Flexible Fleet Management ",
                            body: "With __No Hidden Costs__",
                            image: null
                        },
                        tiles: {
                            name: "Not Quite Convinced? Also Included:",
                            tiles: [
                                {
                                    body: "Pretium facilisi etiam pretium, cras interdum enim, nullam.",
                                    title: "Price Protection",
                                    image: null
                                },
                                {
                                    body: "Pretium facilisi etiam pretium, cras interdum enim, nullam.",
                                    title: "Customer Reviews",
                                    image: null
                                },
                                {
                                    body: "Pretium facilisi etiam pretium, cras interdum enim, nullam.",
                                    title: "Quote Online",
                                    image: null
                                },
                                {
                                    body: "Pretium facilisi etiam pretium, cras interdum enim, nullam.",
                                    title: "Confused About Leasing?",
                                    image: null
                                }
                            ]
                        }
                    }
                } as FleetPageData,
            },
        },
    },
];

describe('<FleetLandingPage />', () => {
    // beforeEach(async () => {
    //     render(
    //         <MockedProvider addTypename={false} mocks={mocked}>
    //             <FleetLandingPage />
    //         </MockedProvider>,
    //     );
    // });

    it('renders correctly with error', async () => {
        (useFleetLandingPage as jest.Mock).mockReturnValue({
            loading: false,
            data: undefined,
            error: { message: 'Error' },
        });

        const getComponent = () => {
            return renderer.create(<FleetLandingPage />).toJSON();
        };

        const tree = getComponent();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with loading', async () => {
        (useFleetLandingPage as jest.Mock).mockReturnValue({
            loading: true,
            data: undefined,
            error: undefined,
        });

        const getComponent = () => {
            return renderer.create(<FleetLandingPage />).toJSON();
        };

        const tree = getComponent();
        expect(tree).toMatchSnapshot();
    });

    it('should render correctly', async () => {
        render(
            <MockedProvider addTypename={false} mocks={mocked}>
                <FleetLandingPage />
            </MockedProvider>,
        );
        await waitFor(() => {
            expect(screen.getByText('Cheaper than buying')).toBeInTheDocument();
        });
    });
});

describe('<FleetLandingPage />', () => {
    it('renders correctly with data', async () => {
        (useFleetLandingPage as jest.Mock).mockReturnValue({
            loading: false,
            data: {
                fleetLandingPage: {
                    id: "1iXmVZNIGFolU38Jol4j08",
                    sections: {
                        featured1: {
                            title: "Wherever You Are, However You Want To Work, We're There For You",
                            titleTag: null,
                            body: "The prospect of managing a mixed fleet of multiple vehicles, on varied financial contracts, is daunting...but we'll take that away. Our dedicated team, and the platforms available to you and us, mean that running your mixed fleet is hassle-free.",
                            layout: [
                                "Media Right"
                            ]
                        },
                        featured2: {
                            title: "What's In It For My Business?",
                            titleTag: null,
                            body: "### Every fleet is different: \nYour fleet needs are unique and that's why entrusting yours to a company you trust is important.\n\n### Best price for your business:\nChoosing a fleet management company that works with a network of funders means they can provide the very best prices on the market first time.\n\n### Compliance as standard: \nDuty of care is a key concern and goes hand-in-hand with staying compliant. Driver risk assessments and safety checks need to be carried out on time and to high standards, so work with a company that understands how to keep you organised.\n",
                            image: null,
                            layout: [
                                "Media Left"
                            ]
                        },
                        featured3: {
                            title: "What's In It For Me?",
                            titleTag: null,
                            body: "### Hassle-free fleet reporting:\nFrom MOT notifications to duty of care compliance tasks, keeping information at your fingertips is vital to effective fleet management.\n\n### Protect your fleet: \nHaving your fleet managed and insured through one channel makes life less complicated for you.\n\n### Cost-effective fleet maintenance: \nEasy access to all routine servicing and repairs, tyre replacement, MOTs and vehicle breakdown cover is true peace-of-mind.\n\n### Sale and lease back: \nRemoving vehicles from outright purchase and into a lease agreement allows you to grow your business faster by giving you the option to invest cash into your business rather than the vehicles.\n\n### Controlling costs: \nA robust reporting platform will allow you to look at maintenance budgets, total driver costs and whole-life fleet costings at a moment's notice.",
                            image: {
                                title: "AudiQ30718 4 k5ojqt",
                                file: {
                                    url: "//images.ctfassets.net/3xid768u5joa/2QbzKD75ObIHIeVMzNeCF/1455166780ba4eb095c965e278a63b69/AudiQ30718_4_k5ojqt.jpg"
                                }
                            },
                            layout: [
                                "Media Right"
                            ]
                        },
                        featured4: {
                            title: "What's In It For The Drivers?",
                            titleTag: null,
                            body: "### Maintenance when it's needed: \nNo matter which maintenance package you choose, the drivers themselves can arrange bookings through the Driverhelpline application or by calling the support team.\n\n### Comprehensive vehicle management: \nHow great would it be if drivers knew that support was just a tap on an app away? They'll benefit from the same up-to-date reporting and service-on-demand functions as you. Drivers know they're being compliant, and you can rest easy.\n\n### Peace of mind and support:\nFor drivers, the fleet management relationship shouldn't be centred on vehicle delivery, they want support. And they'll have questions they need answered. That's when having a dedicated app filled with the information they need, and a dedicated support team really will pay for itself.",
                            image: null,
                            layout: [
                                "Media Left"
                            ]
                        },
                        leadText: {
                            heading: "Why You Should Trust Your Fleet With Vanarama",
                            titleTag: null,
                            description: "The prospect of managing a mixed fleet of multiple vehicles, on varied financial contracts, is daunting...but we'll take that away. Our dedicated team, and the platforms available to you and us, mean that running your mixed fleet is hassle-free"
                        },
                        hero: {
                            title: "Flexible Fleet Management ",
                            body: "With __No Hidden Costs__",
                            image: null
                        },
                        tiles: {
                            name: "Not Quite Convinced? Also Included:",
                            tiles: [
                                {
                                    body: "Pretium facilisi etiam pretium, cras interdum enim, nullam.",
                                    title: "Price Protection",
                                    image: null
                                },
                                {
                                    body: "Pretium facilisi etiam pretium, cras interdum enim, nullam.",
                                    title: "Customer Reviews",
                                    image: null
                                },
                                {
                                    body: "Pretium facilisi etiam pretium, cras interdum enim, nullam.",
                                    title: "Quote Online",
                                    image: null
                                },
                                {
                                    body: "Pretium facilisi etiam pretium, cras interdum enim, nullam.",
                                    title: "Confused About Leasing?",
                                    image: null
                                }
                            ]
                        }
                    }
                } as FleetPageData,
            },
            error: undefined,
        });

        const getComponent = () => {
            return renderer.create(<FleetLandingPage />).toJSON();
        };

        const tree = getComponent();
        expect(tree).toMatchSnapshot();
    });


});
