export interface IItem {
  _id?: string;
  ownerId: string;
  collectionId: string;
  ownerName?: string;
  itemTitle: string;
  itemDescription: string;
  imgLink: string;
}

export interface IResponseApiItem {
  accessToken: string;
  refreshToken: string;
  item: IItem;
}
