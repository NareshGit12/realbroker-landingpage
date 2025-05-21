
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
      <div className="bg-realtor-500 h-12"></div>
      
      <div className="flex flex-col items-center px-4 pt-0 pb-4 relative h-full">
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
        <h3 className="text-xl font-bold text-center text-black">{broker.name}</h3>
        
        {/* Rating stars */}
        <div className="flex items-center gap-1 my-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < broker.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
            />
          ))}
        </div>
        
        {/* Agency and location */}
        <p className="text-realtor-500 font-medium text-center">{broker.agency}</p>
        <p className="text-sm text-black mb-3">{broker.location}</p>
        
        {/* Description - with truncation */}
        <p className="text-sm text-center line-clamp-3 mb-4 text-black">
          {broker.description}
        </p>
        
        {/* Areas of expertise */}
        <div className="w-full">
          <p className="text-sm text-center font-medium mb-2 text-black">Areas of Expertise:</p>
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            {broker.expertiseAreas.map((area) => (
              <span 
                key={area} 
                className="bg-red-50 text-realtor-500 text-xs px-3 py-1"
                style={{ borderRadius: '0' }}
              >
                {area}
              </span>
            ))}
          </div>
        </div>
        
        {/* Properties and member since */}
        <div className="flex flex-col items-center mt-auto border-t border-gray-100 pt-3 w-full">
          <div className="flex items-center gap-1">
            <span className="text-sm text-black">{broker.propertiesCount} Properties listed on</span>
            <span className="text-realtor-500 font-bold">RB</span>
          </div>
          <p className="text-sm text-black">Member since {broker.memberSince}</p>
        </div>
      </div>
    </Card>
  );
};

export default BrokerCard;
