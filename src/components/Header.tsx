
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Header = () => {
  return (
    <Card className="bg-white shadow-sm border-b">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 admin-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DV</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Data Voyager Panel</h1>
              <p className="text-sm text-gray-600">Cloud-based data scraping & management</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-900 font-medium">Admin User</p>
              <p className="text-xs text-gray-500">admin@datavoyager.com</p>
            </div>
            <div className="w-8 h-8 bg-admin-100 rounded-full flex items-center justify-center">
              <span className="text-admin-600 font-medium text-sm">A</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Header;
