import { Link } from 'react-router-dom';
import { Button } from '@/component/ui/button';
import { Card } from '@/component/ui/card';
import { Home, Heart } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="mb-6">
          <Heart className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-6">
            The page you're looking for doesn't exist. Let's get you back to your health assessment.
          </p>
        </div>
        
        <Link to="/">
          <Button className="w-full">
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default NotFound;
