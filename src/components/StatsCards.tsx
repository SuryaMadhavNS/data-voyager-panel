
import { Card } from "@/components/ui/card";

interface StatsCardsProps {
  totalRecords: number;
  lastUpdated: string;
  isLoading: boolean;
}

const StatsCards = ({ totalRecords, lastUpdated, isLoading }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="stats-card">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Total Records</h3>
          <p className={`text-3xl font-bold ${isLoading ? 'animate-pulse-slow' : ''}`}>
            {isLoading ? '...' : totalRecords.toLocaleString()}
          </p>
        </div>
      </Card>
      
      <Card className="stats-card">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Data Source</h3>
          <p className="text-xl font-medium">News Headlines</p>
        </div>
      </Card>
      
      <Card className="stats-card">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Status</h3>
          <p className="text-xl font-medium flex items-center justify-center">
            <span className="w-2 h-2 bg-green-300 rounded-full mr-2"></span>
            {isLoading ? 'Scraping...' : 'Ready'}
          </p>
        </div>
      </Card>
      
      <Card className="stats-card">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Last Updated</h3>
          <p className="text-sm font-medium">{lastUpdated}</p>
        </div>
      </Card>
    </div>
  );
};

export default StatsCards;
