import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface MemberAvatar {
  id: string;
  avatar_url: string;
}

const MemberCarousel: React.FC = () => {
  const [members, setMembers] = useState<MemberAvatar[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, avatar_url')
        .ilike('role', '%user%')
        .not('avatar_url', 'is', null)
        .limit(20);

      if (!error && data) {
        setMembers(data as MemberAvatar[]);
      }
    };

    fetchMembers();
  }, []);

  // Duplicate members for seamless loop
  const duplicatedMembers = [...members, ...members];

  if (members.length === 0) {
    return null;
  }

  return (
    <div className="w-full overflow-hidden py-6">
      <div className="relative">
        <div 
          className="flex gap-4 animate-scroll"
          style={{
            width: `${duplicatedMembers.length * 68}px`,
          }}
        >
          {duplicatedMembers.map((member, index) => (
            <div
              key={`${member.id}-${index}`}
              className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white shadow-lg"
            >
              <img
                src={member.avatar_url}
                alt="Member"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default MemberCarousel;
