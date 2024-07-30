export interface IListNews {
  listNews: INews[];
}

export interface INews {
  id: string;
  title: string;
  body: string;
  imageurl: string;
  url: string;
}
