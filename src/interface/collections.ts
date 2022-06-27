export interface ICollection {
  _id?: string;
  ownerId: string;
  ownerName?: string;
  collectionTitle: string;
  collectionDescription: string;
  country: string;
  city: string;
  date: [string | Date, string | Date | null];
}

export interface IResponseApiCollection {
  accessToken: string;
  refreshToken: string;
  collection: ICollection;
}
