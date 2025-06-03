
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

type ActivityCardProps = {
  image: string;
  title: string;
  date: string;
  time: string;
  location: string;
  id: number;
  isFull?: boolean;
  isOnSale?: boolean;
  price: string;
};

const ActivityCard = ({ 
  image, 
  title, 
  date, 
  time, 
  location, 
  id, 
  isFull = false,
  isOnSale = true,
  price 
}: ActivityCardProps) => {
  return (
    <div className="activity-card bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-3 flex flex-col h-full">
      <div className="relative mb-2">
        <img src={image} alt={title} className="activity-card-image w-full h-48 object-cover rounded" />
      </div>
      <div className="flex-1 flex flex-col">
        <h3 className="font-serif font-medium text-lg mb-1">{title}</h3>
        <p className="text-sm text-lovely-slate mb-1">{date}</p>
        <p className="text-sm text-lovely-slate mb-1">{time}</p>
        <p className="text-sm text-lovely-slate mb-1">{location}</p>
        <p className="text-sm font-medium text-lovely-slate mb-3">{price}</p>
        <div className="mt-auto">
          <Link to={`/activity/${id}`}>
            <Button 
              className={`${
                isFull ? 'bg-lovely-sage text-white' : 
                isOnSale ? 'bg-lovely-red text-white' : 'bg-lovely-coral text-white'
              } w-full hover:opacity-90`}
              disabled={isFull}
            >
              {isFull ? 'Fullbokad' : 'Mer information'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
