
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

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
  const getSaleStatus = () => {
    if (isOnSale && !isFull) {
      return "Biljetter tillgängliga";
    } else if (isOnSale && isFull) {
      return "Fullbokad";
    } else {
      return "Intresseanmälan";
    }
  };

  const getSaleStatusColor = () => {
    if (isOnSale && !isFull) {
      return "bg-green-100 text-green-800";
    } else if (isOnSale && isFull) {
      return "bg-red-100 text-red-800";
    } else {
      return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="activity-card bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-3 flex flex-col h-full">
      <div className="flex-1 flex flex-col">
        <h3 className="font-serif font-medium text-lg mb-1">{title}</h3>
        <Badge className={`${getSaleStatusColor()} mb-2 w-fit text-xs`} variant="outline">
          {getSaleStatus()}
        </Badge>
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
