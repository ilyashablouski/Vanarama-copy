export const conditionItems = [
  `You're between 25 & 75 years of age.`,
  `You've had a full UK or EU Driving Licence for at least 2 years.`,
  `You have a minimum of 3 years no claims discount bonus.`,
  `The car will be kept at your home address overnight.`,
  `You have not been banned from driving within the past 5 years.`,
  `You have a maximum of 6 penalty conviction points on your Driving Licence.`,
  `You've lived in the UK for at least the past 2 years.`,
  `You've not had any previous insurance policies cancelled.`,
  `You've not had any fault claims in the past 12 months.`,
  `In the past 3 years you've had no more than 2 claims (either 2 non-fault or 1 non-fault and 1 fault).`,
  `You do not have any criminal convictions, CCJs, IVAs or have been declared bankrupt.`,
];

export const includedItems = [
  {
    value: 'Routine servicing & maintenance (collection & delivery available)',
  },
  {
    value:
      'ALL batteries, brake pads & exhaust replacement caused by fair wear & tear',
  },
  { value: 'Warranty-related work' },
  {
    value:
      'Work required to keep the vehicle roadworthy. E.g antifreeze/engine coolant',
  },
  {
    value:
      'Standard usage tyre replacement, including 1 accidental tyre per year',
  },
  { value: 'MOTs, if required' },
  {
    value: 'Full RAC Breakdown Cover, including:',
    innerItems: [
      'Standard breakdown cover.',
      'Home-Start (for when your vehicle breaks down at home).',
      'Recovery (to make sure your vehicle gets home).',
    ],
  },
  { value: 'Home-Start (for when your vehicle breaks down at home)' },
  { value: 'Recovery (to make sure your vehicle gets home)' },
  {
    value:
      'Replacement vehicle for up to 7 days if your vehicle is off the road due to breakdown for more than 24 hours (1 business day).',
  },
];

export const notIncludedItems = [
  'Fuel, AdBlue, washing or parking charges.',
  'Any repairs or maintenance required because of accidental, negligent or wilful damage caused by the driver – including misfuelling.',
  'Damage to glass. E.g. windscreens or mirrors.',
  'Replacing normal tyres with winter tyres.',
  'Any service or repair work for converted bodies, tail lifts or refrigerated vehicles.',
];
