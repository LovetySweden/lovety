
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
};

const ActivityCard = ({ 
  image, 
  title, 
  date, 
  time, 
  location, 
  id, 
  isFull = false,
  isOnSale = true 
}: ActivityCardProps) => {
  return (
    <div className="activity-card bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-3">
      <div className="relative mb-2">
        <img src={image} alt={title} className="activity-card-image w-full h-48 object-cover rounded" />
      </div>
      <h3 className="font-serif font-medium text-lg mb-1">{title}</h3>
      <p className="text-sm text-lovely-slate mb-1">{date}</p>
      <p className="text-sm text-lovely-slate mb-1">{time}</p>
      <p className="text-sm text-lovely-slate mb-3">{location}</p>
      <Link to={`/activity/${id}`}>
        <Button 
          className={`${
            isFull ? 'bg-lovely-sage text-white' : 
            isOnSale ? 'bg-lovely-red text-white' : 'bg-lovely-beige text-lovely-slate'
          } w-full hover:opacity-90`}
          disabled={isFull}
        >
          {isFull ? 'Fullbokad' : isOnSale ? 'Boka plats' : 'Registrera intresse'}
        </Button>
      </Link>
    </div>
  );
};

export default ActivityCard;
