import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface MemberAvatar {
  id: string;
  avatar_url: string;
}

const BATCH_SIZE = 20;
const ROTATION_INTERVAL = 120000; // 2 minutes in milliseconds

const MemberCarousel: React.FC = () => {
  const [members, setMembers] = useState<MemberAvatar[]>([]);
  const [allMembers, setAllMembers] = useState<MemberAvatar[]>([]);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);

  // Fetch all members with avatars once
  useEffect(() => {
    const fetchAllMembers = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, avatar_url')
        .ilike('role', '%user%')
        .not('avatar_url', 'is', null);

      if (!error && data) {
        setAllMembers(data as MemberAvatar[]);
        // Set initial batch
        setMembers(data.slice(0, BATCH_SIZE) as MemberAvatar[]);
      }
    };

    fetchAllMembers();
  }, []);

  // Rotate batches every 2 minutes
  useEffect(() => {
    if (allMembers.length <= BATCH_SIZE) return;

    const interval = setInterval(() => {
      setCurrentBatchIndex((prevIndex) => {
        const totalBatches = Math.ceil(allMembers.length / BATCH_SIZE);
        const nextIndex = (prevIndex + 1) % totalBatches;
        const startIdx = nextIndex * BATCH_SIZE;
        const endIdx = Math.min(startIdx + BATCH_SIZE, allMembers.length);
        
        // If we're at the last batch and it's smaller, wrap around to include from beginning
        let newBatch = allMembers.slice(startIdx, endIdx);
        if (newBatch.length < BATCH_SIZE && allMembers.length > BATCH_SIZE) {
          const remaining = BATCH_SIZE - newBatch.length;
          newBatch = [...newBatch, ...allMembers.slice(0, remaining)];
        }
        
        setMembers(newBatch);
        return nextIndex;
      });
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, [allMembers]);

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
            width: `${duplicatedMembers.length * 120}px`,
          }}
        >
          {duplicatedMembers.map((member, index) => (
            <div
              key={`${member.id}-${index}`}
              className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-white shadow-lg"
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
          animation: scroll 27s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default MemberCarousel;
