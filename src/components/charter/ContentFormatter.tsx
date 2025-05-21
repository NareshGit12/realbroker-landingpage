
import React from 'react';

export const formatNumberedContent = (text: string, title: string, subtitle?: string, description?: string) => {
  // Clean up text to ensure consistent formatting
  const cleanText = text.trim().replace(/\r\n/g, '\n');
  
  // Split the text by numbered points (1., 2., etc.) or numbered points with dash (1-, 2-, etc.)
  const sections = cleanText.split(/(\d+[\.-])\s+/);
  
  if (sections.length <= 1) {
    // If no numbered points are detected, just display the text normally
    return formatText(cleanText);
  }
  
  // Group the sections into points
  const points = [];
  for (let i = 1; i < sections.length; i += 2) {
    if (i + 1 < sections.length) {
      points.push({ number: sections[i], content: sections[i + 1].trim() });
    }
  }
  
  return (
    <div className="space-y-8">
      {points.length > 0 ? (
        <>
          {/* Introduction section with consistent styling */}
          <div className="border-l-4 border-realtor-500 pl-6 py-2 mb-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              {title}
            </h3>
            <div className="space-y-3 ml-4">
              {subtitle && <p className="text-gray-600 font-medium">{subtitle}</p>}
              {description && <p className="text-gray-600">{description}</p>}
            </div>
          </div>
          
          {/* Numbered points */}
          {points.map((point, index) => (
            <div key={index} className="border-l-4 border-realtor-500 pl-6 py-2">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                {point.number} {point.content.split('\n')[0]}
              </h3>
              <div className="space-y-3 ml-4">
                {point.content
                  .split('\n')
                  .slice(1)
                  .filter(line => line.trim()) // Filter out empty lines
                  .map((line, i) => {
                    // Check if line starts with a bullet point marker
                    const isBulletPoint = line.trim().startsWith('•');
                    const bulletText = isBulletPoint ? line.trim().substring(1).trim() : line.trim();
                    
                    return (
                      <div key={i} className="flex items-start">
                        <span className="text-realtor-500 mr-2 mt-1">•</span>
                        <p className="text-gray-600">{bulletText}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </>
      ) : (
        // Fallback if parsing fails
        formatText(cleanText)
      )}
    </div>
  );
};

// Format text function to handle line breaks
export const formatText = (text: string) => {
  return text.split('\n').map((paragraph, index) => (
    paragraph.trim() ? (
      <p key={index} className="mb-4 text-gray-600">
        {paragraph}
      </p>
    ) : <br key={index} />
  ));
};
