
export type Activity = {
  id: number;
  image: string;
  title: string;
  date: string;
  time: string;
  location: string;
  address?: string;
  description: string;
  price: string;
  earlyBirdPrice?: string;
  earlyBirdUntil?: string;
  isFull?: boolean;
  isOnSale?: boolean;
};

export type InterestRegistration = {
  activityId: number;
  name: string;
  email: string;
};
