
export type Activity = {
  id: number;
  image: string;
  detailImage?: string; // Optional separate image for detail page
  title: string;
  date: string;
  time: string;
  location: string;
  address?: string;
  description: string;
  price: string;
  earlyBirdPrice?: string;
  earlyBirdExpiryDate?: string; // ISO date string for when early bird expires
  externalPaymentLink?: string; // External payment link
  isFull?: boolean;
  isOnSale?: boolean;
  activityHeading?: string;
};

export type InterestRegistration = {
  activityId: number;
  name: string;
  email: string;
};
