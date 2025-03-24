
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/home/Footer';
import { headingVariants } from '@/utils/abTesting';

type HeadingStats = {
  variantId: number;
  title: string;
  subtitle: string;
  impressions: number;
  conversions: number;
  conversionRate: number;
};

const Analytics: React.FC = () => {
  const [stats, setStats] = useState<HeadingStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        
        // This would be a server-side operation in a real app
        // For this demo, we'll compute the stats on the client
        
        // Get all invite requests
        const { data: inviteRequests, error } = await supabase
          .from('invite_requests')
          .select('heading_variant_id')
          .not('heading_variant_id', 'is', null);
          
        if (error) throw error;
        
        // Initialize stats for each variant
        const statsMap: Record<number, HeadingStats> = {};
        
        // Initialize with zeros
        headingVariants.forEach(variant => {
          statsMap[variant.id] = {
            variantId: variant.id,
            title: variant.title,
            subtitle: variant.subtitle,
            impressions: 0, // We don't have a reliable way to track impressions yet
            conversions: 0,
            conversionRate: 0
          };
        });
        
        // Count conversions
        inviteRequests?.forEach(request => {
          if (request.heading_variant_id && statsMap[request.heading_variant_id]) {
            statsMap[request.heading_variant_id].conversions++;
          }
        });
        
        // For this demo, we'll estimate impressions
        // In a real app, you'd track this server-side
        Object.values(statsMap).forEach(stat => {
          // Set some fake impression numbers for demonstration
          stat.impressions = stat.conversions * (Math.floor(Math.random() * 5) + 2);
          stat.conversionRate = stat.impressions > 0 
            ? (stat.conversions / stat.impressions) * 100 
            : 0;
        });
        
        setStats(Object.values(statsMap));
        
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError('Failed to load analytics data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Heading Conversion Analytics</h1>
        
        {isLoading && <p className="text-muted-foreground">Loading analytics data...</p>}
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
            {error}
          </div>
        )}
        
        {!isLoading && !error && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map(stat => (
                <div key={stat.variantId} className="border rounded-lg p-6 bg-white shadow-sm">
                  <span className="text-xs font-medium text-muted-foreground uppercase">Variant {stat.variantId}</span>
                  <h3 className="font-medium mt-1 mb-3 line-clamp-2">{stat.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{stat.subtitle}</p>
                  
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Impressions</p>
                      <p className="text-xl font-semibold">{stat.impressions}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Conversions</p>
                      <p className="text-xl font-semibold">{stat.conversions}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Rate</p>
                      <p className="text-xl font-semibold">{stat.conversionRate.toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-amber-50 border border-amber-200 text-amber-700 p-4 rounded-md mt-8">
              <p className="text-sm">
                <strong>Note:</strong> Impression data is estimated for demonstration purposes. 
                In a production environment, you would need to implement server-side tracking 
                to accurately count impressions for each heading variant.
              </p>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Analytics;
