
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import StatsCards from "@/components/StatsCards";
import ScrapingControls from "@/components/ScrapingControls";
import DataTable from "@/components/DataTable";

interface DataItem {
  id: number;
  title: string;
  source: string;
  category: string;
  scrapedAt: string;
  url: string;
}

const Index = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("Never");

  // Mock data for demonstration
  const mockData: DataItem[] = [
    {
      id: 1,
      title: "Tech Giants Report Strong Q4 Earnings",
      source: "TechNews",
      category: "Technology",
      scrapedAt: "2024-05-23 14:30:00",
      url: "https://example.com/tech-earnings"
    },
    {
      id: 2,
      title: "Climate Change Summit Reaches Historic Agreement",
      source: "WorldNews",
      category: "Environment",
      scrapedAt: "2024-05-23 13:45:00",
      url: "https://example.com/climate-summit"
    },
    {
      id: 3,
      title: "New AI Breakthrough in Medical Diagnosis",
      source: "MedTech",
      category: "Healthcare",
      scrapedAt: "2024-05-23 12:15:00",
      url: "https://example.com/ai-medical"
    },
    {
      id: 4,
      title: "Global Markets Show Signs of Recovery",
      source: "FinanceDaily",
      category: "Finance",
      scrapedAt: "2024-05-23 11:30:00",
      url: "https://example.com/market-recovery"
    },
    {
      id: 5,
      title: "Space Mission Successfully Lands on Mars",
      source: "SpaceNews",
      category: "Science",
      scrapedAt: "2024-05-23 10:45:00",
      url: "https://example.com/mars-mission"
    }
  ];

  useEffect(() => {
    // Load initial mock data
    setData(mockData);
    setLastUpdated(new Date().toLocaleString());
  }, []);

  const handleScrape = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Add some new mock data to simulate scraping
    const newItems: DataItem[] = [
      {
        id: data.length + 1,
        title: "Breaking: Major Cybersecurity Incident Reported",
        source: "SecurityAlert",
        category: "Security",
        scrapedAt: new Date().toLocaleString(),
        url: "https://example.com/security-incident"
      },
      {
        id: data.length + 2,
        title: "Revolutionary Battery Technology Announced",
        source: "EnergyTech",
        category: "Technology",
        scrapedAt: new Date().toLocaleString(),
        url: "https://example.com/battery-tech"
      }
    ];
    
    setData(prevData => [...newItems, ...prevData]);
    setLastUpdated(new Date().toLocaleString());
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="animate-fade-in">
          <StatsCards 
            totalRecords={data.length}
            lastUpdated={lastUpdated}
            isLoading={isLoading}
          />
          
          <ScrapingControls 
            onScrapeClick={handleScrape}
            isLoading={isLoading}
          />
          
          <DataTable 
            data={data}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
