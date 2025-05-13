
export type Activity = {
  id: number;
  image: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  price: string;
  isFull?: boolean;
  isOnSale?: boolean;
};

export type InterestRegistration = {
  activityId: number;
  name: string;
  email: string;
};
