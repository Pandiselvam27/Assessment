export interface Logo {
  id: number;
  image: string;
  name: string;
}

export interface Data {
  data: object;
  allProducts: object;
}

export interface Model {
  id: any;
  model: string;
  location: string;
  colour: string;
  noOfOwners: number;
  yearOfManufacture: string;
  transmission: string;
  insuranceValidUpto: string;
  externalFitments: string;
  kms: number;
  photo: any;
}
