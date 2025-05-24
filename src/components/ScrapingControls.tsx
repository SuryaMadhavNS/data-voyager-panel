
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface ScrapingControlsProps {
  onScrapeClick: () => void;
  isLoading: boolean;
}

const ScrapingControls = ({ onScrapeClick, isLoading }: ScrapingControlsProps) => {
  const { toast } = useToast();

  const handleScrapeClick = () => {
    onScrapeClick();
    toast({
      title: "Scraping Started",
      description: "Fetching latest data from news sources...",
    });
  };

  return (
    <Card className="data-card p-6 mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Scraping Controls</h3>
          <p className="text-gray-600">Manually trigger data collection from external sources</p>
        </div>
        
        <Button 
          onClick={handleScrapeClick}
          disabled={isLoading}
          className="admin-gradient hover:opacity-90 transition-opacity px-8 py-3 text-lg font-medium"
        >
          {isLoading ? (
            <>
              <span className="animate-spin mr-2">⟳</span>
              Scraping...
            </>
          ) : (
            <>
              <span className="mr-2">🔄</span>
              Scrape Now
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default ScrapingControls;
