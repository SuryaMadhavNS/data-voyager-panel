
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Mail } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setShowEmailConfirmation(false);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Email not confirmed')) {
            toast({
              title: "Email Not Confirmed",
              description: "Please check your email and click the confirmation link before logging in.",
              variant: "destructive",
            });
          } else if (error.message.includes('Invalid login credentials')) {
            toast({
              title: "Login Failed",
              description: "Invalid email or password. Please check your credentials.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Login Failed",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Welcome back!",
            description: "You have successfully logged in.",
          });
          navigate('/');
        }
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          if (error.message.includes('Email signups are disabled')) {
            toast({
              title: "Sign Up Disabled",
              description: "Email signups are currently disabled. Please contact support.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Sign Up Failed",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          setShowEmailConfirmation(true);
          toast({
            title: "Account Created!",
            description: "Please check your email to verify your account before logging in.",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (showEmailConfirmation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h1>
            <p className="text-gray-600 mb-6">
              We've sent a confirmation link to <strong>{email}</strong>. 
              Please click the link in your email to verify your account.
            </p>
            
            <Alert className="mb-6">
              <Mail className="h-4 w-4" />
              <AlertDescription>
                After confirming your email, return here and log in with your credentials.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <Button
                onClick={() => {
                  setShowEmailConfirmation(false);
                  setIsLogin(true);
                }}
                className="w-full"
              >
                Return to Login
              </Button>
              
              <Button
                onClick={() => {
                  setShowEmailConfirmation(false);
                  setIsLogin(false);
                }}
                variant="outline"
                className="w-full"
              >
                Sign Up Different Account
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 admin-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">DV</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Data Voyager Panel</h1>
          <p className="text-gray-600 mt-2">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </p>
        </div>

        {isLogin && (
          <Alert className="mb-6">
            <Mail className="h-4 w-4" />
            <AlertDescription>
              Make sure you've confirmed your email address before logging in.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required={!isLogin}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              minLength={6}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full admin-gradient hover:opacity-90 transition-opacity"
          >
            {loading ? (
              <>
                <span className="animate-spin mr-2">⟳</span>
                {isLogin ? 'Signing in...' : 'Creating account...'}
              </>
            ) : (
              isLogin ? 'Sign In' : 'Sign Up'
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            {isLogin 
              ? "Don't have an account? Sign up" 
              : "Already have an account? Sign in"}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
