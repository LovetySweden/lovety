
import { Button } from "./ui/button";

type ActivityCardProps = {
  image: string;
  title: string;
  date: string;
  time: string;
  location: string;
  isFull?: boolean;
};

const ActivityCard = ({ image, title, date, time, location, isFull = false }: ActivityCardProps) => {
  return (
    <div className="activity-card">
      <div className="relative mb-2">
        <img src={image} alt={title} className="activity-card-image" />
      </div>
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-gray-600 mb-1">{date}</p>
      <p className="text-sm text-gray-600 mb-2">{time}</p>
      <p className="text-sm text-gray-600 mb-3">{location}</p>
      <Button 
        className={`${isFull ? 'bg-gray-300' : 'bg-lovely-red'} w-full`}
        disabled={isFull}
      >
        {isFull ? 'Fullbokad' : 'Boka plats'}
      </Button>
    </div>
  );
};

export default ActivityCard;
