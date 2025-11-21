import PropTypes from 'prop-types';
import { Calendar, MapPin, DollarSign, Users } from "lucide-react";
import { Card, CardContent } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";

export const EventCard = ({ event }) => {
  const { 
    title, 
    category, 
    date, 
    time, 
    venue, 
    price, 
    image, 
    availablePeople 
  } = event;
  return (
    <Card className="overflow-hidden hover-lift transition-all duration-300 group">
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Category Badge */}
        <Badge className="absolute top-3 right-3 bg-background/90 backdrop-blur text-foreground border border-border">
          {category}
        </Badge>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Event Details */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{date} • {time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">{venue}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            <span className="font-semibold text-foreground">{price}</span>
          </div>
        </div>

        {/* Available People Badge */}
        {availablePeople > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 bg-secondary/50 rounded-lg">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">
              🚩 {availablePeople} {availablePeople === 1 ? 'person' : 'people'} available
            </span>
          </div>
        )}

        {/* View Details Button */}
        <Button variant="primary" className="w-full mt-4">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    venue: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    availablePeople: PropTypes.number,
  }).isRequired,
};
