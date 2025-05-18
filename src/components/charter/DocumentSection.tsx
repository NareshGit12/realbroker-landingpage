
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import RevealAnimation from '@/components/ui/RevealAnimation';

interface DocumentSectionProps {
  content: string;
  isLoading: boolean;
  formatContent: (text: string, title: string, subtitle?: string, description?: string) => React.ReactNode;
  title: string;
  subtitle?: string;
  description?: string;
}

const DocumentSection: React.FC<DocumentSectionProps> = ({
  content,
  isLoading,
  formatContent,
  title,
  subtitle,
  description
}) => {
  return (
    <RevealAnimation>
      <Card className="border-0 shadow-md overflow-hidden bg-white mb-12">
        <CardContent className="p-8">
          {isLoading ? (
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse w-full"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse w-5/6"></div>
            </div>
          ) : (
            <div className="prose prose-lg max-w-none">
              {formatContent(content, title, subtitle, description)}
            </div>
          )}
        </CardContent>
      </Card>
    </RevealAnimation>
  );
};

export default DocumentSection;
