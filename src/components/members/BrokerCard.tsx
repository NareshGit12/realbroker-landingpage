
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

export interface BrokerInfo {
  id: string;
  name: string;
  agency: string;
  location: string;
  description: string;
  imageSrc: string;
  rating: number;
  expertiseAreas: string[];
  memberSince: string;
  propertiesCount: number;
}

const BrokerCard: React.FC<{ broker: BrokerInfo }> = ({ broker }) => {
  return (
    <Card className="border border-realtor-100 shadow-md overflow-hidden w-full bg-white h-full" style={{ borderRadius: '0' }}>
      {/* Red header */}
      <div className="bg-realtor-500 h-8"></div>
      
      <div className="flex flex-col items-center px-4 pt-0 pb-3 relative h-full">
        {/* Avatar - positioned to overlap the red header */}
        <div className="relative -mt-8 mb-2">
          <Avatar className="w-24 h-24 border-4 border-white shadow-sm">
            <AvatarImage src={broker.imageSrc} alt={broker.name} />
            <AvatarFallback className="text-xl font-bold text-black">
              {broker.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
        
        {/* Name and agency */}
        <h3 className="text-lg font-bold text-center text-black mt-1">{broker.name}</h3>
        
        {/* Rating stars */}
        <div className="flex items-center gap-1 my-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-3 w-3 ${i < broker.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
            />
          ))}
        </div>
        
        {/* Agency and location */}
        <p className="text-realtor-500 font-medium text-center text-sm">{broker.agency}</p>
        <p className="text-xs text-black mb-1">{broker.location}</p>
        
        {/* Description - showing more lines with smaller font */}
        <p className="text-xs text-center line-clamp-6 mb-2 text-black">
          {broker.description}
        </p>
        
        {/* Areas of expertise - moved closer to bio */}
        <div className="w-full mt-auto">
          <p className="text-xs text-center font-medium mb-1 text-black">Areas of Expertise:</p>
          <div className="flex flex-wrap justify-center gap-1 mb-2">
            {broker.expertiseAreas.map((area) => (
              <span 
                key={area} 
                className="bg-red-50 text-realtor-500 text-xs px-2 py-0.5"
                style={{ borderRadius: '0' }}
              >
                {area}
              </span>
            ))}
          </div>
        </div>
        
        {/* Properties and member since */}
        <div className="flex flex-col items-center border-t border-gray-100 pt-1 w-full mt-1">
          <div className="flex items-center gap-1">
            <span className="text-xs text-black">{broker.propertiesCount} Properties listed on</span>
            <span className="text-realtor-500 font-bold">RB</span>
          </div>
          <p className="text-xs text-black">Member since {broker.memberSince}</p>
        </div>
      </div>
    </Card>
  );
};

export default BrokerCard;
