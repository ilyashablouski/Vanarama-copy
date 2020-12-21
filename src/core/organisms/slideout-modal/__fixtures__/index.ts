export const searchFilters = {
  manufacturers: [
    { label: 'Audi', value: 'Audi' },
    { label: 'BMW', value: 'BMW' },
    { label: 'Ferrari', value: 'Ferrari' },
    { label: 'Fiat', value: 'Fiat' },
    { label: 'Mercedes-Benz', value: 'Mercedes-Benz' },
    { label: 'Tesla', value: 'Tesla' },
    { label: 'Volvo', value: 'Volvo' },
  ],
  ranges: [
    { label: 'A1', value: 'A1' },
    { label: 'A3', value: 'A3' },
    { label: '3 Series', value: '3 Series' },
    { label: '4 Series', value: '4 Series' },
    { label: 'C Class', value: 'C Class' },
    { label: 'Model S', value: 'Model S' },
  ],
  budget: [
    { label: '0', value: '0' },
    { label: '100', value: '100' },
    { label: '200', value: '200' },
    { label: '300', value: '300' },
    { label: '400', value: '400' },
    { label: '500', value: '500' },
  ],
  bodyType: [
    { label: '4x4', value: '4x4' },
    { label: 'Coupe', value: 'Coupe' },
    { label: 'Convertible', value: 'Convertible' },
    { label: 'Estate', value: 'Estate' },
    { label: 'Saloon', value: 'Saloon' },
  ],
  transmission: [
    { label: 'Automatic', value: 'Automatic' },
    { label: 'Manual', value: 'Manual' },
  ],
  fuelType: [
    { label: 'Petrol', value: 'Petrol' },
    { label: 'Diesel', value: 'Diesel' },
    { label: 'Electric', value: 'Electric' },
  ],
};

export const selectedFilters = {
  manufacturers: ['BMW'],
  budget: ['100', '300'],
  ranges: ['4 Series'],
  bodyType: ['Estate'],
  transmission: ['Manual'],
  fuelType: ['Petrol'],
};
