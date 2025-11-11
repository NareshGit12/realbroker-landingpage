
import React from 'react';
import { Link } from 'react-router-dom';

type NavItem = {
  name: string;
  path: string;
};

const FooterNavigation: React.FC = () => {
  const navigationGroups = [
    {
      title: "Explore",
      items: [
        { name: "Meet Our Members", path: "/members" },
        { name: "Member Login", path: "https://my.realbroker.app/login" },
        { name: "Propalyst.com", path: "https://propalyst.com" }
      ]
    },
    {
      title: "Resources",
      items: [
        { name: "Certified RealBroker Program", path: "/certified-realbroker" },
        { name: "Member Code of Conduct", path: "/charter-and-conduct" },
        { name: "Charter", path: "/charter" }
      ]
    },
    {
      title: "Company",
      items: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms-of-use" }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {navigationGroups.map((group, index) => (
        <div key={index}>
          <h4 className="font-semibold text-lg mb-4">{group.title}</h4>
          <ul className="space-y-3">
            {group.items.map((item) => (
              <li key={item.name}>
                {item.path?.startsWith('http') ? (
                  <a 
                    href={item.path} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-muted-foreground hover:text-realtor-600 transition-colors"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link to={item.path} className="text-muted-foreground hover:text-realtor-600 transition-colors">
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FooterNavigation;
