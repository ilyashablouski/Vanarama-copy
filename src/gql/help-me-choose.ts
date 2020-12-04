import { gql } from '@apollo/client';

export const PRODUCTS_FILTER_LIST_BODY_STYLE = gql`
  query ProductsFilterListBodyStyle($filter: ProductFilterListInputObject) {
    productsFilterList(filter: $filter) {
      bodyStyles {
        docCount
        buckets {
          docCount
          key
        }
      }
    }
  }
`;

export const PRODUCTS_FILTER_LIST_FUEL_TYPES = gql`
  query ProductsFilterListFuelTypes($filter: ProductFilterListInputObject) {
    productsFilterList(filter: $filter) {
      fuelTypes {
        docCount
        buckets {
          docCount
          key
        }
      }
    }
  }
`;

export const PRODUCTS_FILTER_LIST = gql`
  query ProductsFilterList($filter: ProductFilterListInputObject) {
    productsFilterList(filter: $filter) {
      transmissions {
        docCount
        buckets {
          docCount
          key
        }
      }
      fuelTypes {
        docCount
        buckets {
          docCount
          key
        }
      }
      bodyStyles {
        docCount
        buckets {
          docCount
          key
        }
      }
      terms {
        docCount
        buckets {
          docCount
          key
        }
      }
      mileages {
        docCount
        buckets {
          docCount
          key
        }
      }
      initialPeriods {
        docCount
        buckets {
          docCount
          key
        }
      }
      initialPayment {
        stats {
          min
          max
        }
      }
      rental {
        stats {
          min
          max
        }
      }
      manufacturers {
        docCount
        buckets {
          docCount
          key
        }
      }
      ranges {
        docCount
        buckets {
          docCount
          key
        }
      }
      models {
        docCount
        buckets {
          docCount
          key
        }
      }
    }
  }
`;

export const PRODUCTS_FILTER_LIST_RESULTS = gql`
  query ProductsFilterListResults($filter: ProductFilterListInputObject) {
    productsFilterList(filter: $filter) {
      manufacturers {
        docCount
        buckets {
          docCount
          key
        }
      }
      ranges {
        docCount
        buckets {
          docCount
          key
        }
      }
      models {
        docCount
        buckets {
          docCount
          key
        }
      }
      initialPayment {
        stats {
          min
          max
        }
      }
      rental {
        stats {
          min
          max
        }
      }
    }
  }
`;
