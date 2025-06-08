
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
