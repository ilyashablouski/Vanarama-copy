export interface IManufacturersSlugVehicles {
  car: {
    manufacturers: string[];
  };
  lcv: {
    manufacturers: string[];
  };
}

export interface IManufacturersSlug {
  vehicles: IManufacturersSlugVehicles;
}
