import React, { useEffect } from 'react';
import { FiArrowLeft, FiMessageCircle, FiPhone, FiMail, FiBook, FiSearch, FiHelpCircle } from 'react-icons/fi';

// Extend Window interface for Chatwoot SDK
declare global {
  interface Window {
    chatwootSDK?: {
      run: (config: { websiteToken: string; baseUrl: string }) => void;
      toggle: () => void;
    };
  }
}

interface HelpSupportScreenProps {
  onBack: () => void;
}

const HelpSupportScreen: React.FC<HelpSupportScreenProps> = ({ onBack }) => {
  useEffect(() => {
    // Initialize Chatwoot widget
    const script = document.createElement('script');
    script.src = 'https://widget.chatwoot.com/sdk.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.chatwootSDK.run({
        websiteToken: 'your-website-token', // Replace with your actual Chatwoot website token
        baseUrl: 'https://app.chatwoot.com', // Replace with your Chatwoot instance URL
      });
    };

    return () => {
      // Cleanup script
      const existingScript = document.querySelector('script[src*="chatwoot"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const openChatwoot = () => {
    if (window.chatwootSDK) {
      window.chatwootSDK.toggle();
    }
  };

  const faqItems = [
    {
      question: "How do I track my order?",
      answer: "Go to 'My Orders' and click on any order to see tracking details."
    },
    {
      question: "What are the delivery charges?",
      answer: "Free delivery on orders above ₹500. Below ₹500, delivery charges are ₹40."
    },
    {
      question: "How do I cancel my order?",
      answer: "You can cancel orders before shipping from the 'My Orders' section."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept UPI, Credit/Debit cards, Net Banking, and Cash on Delivery."
    },
    {
      question: "How do I return a product?",
      answer: "Items can be returned within 7 days of delivery. Contact support for assistance."
    }
  ];

  const supportOptions = [
    {
      icon: FiMessageCircle,
      title: "Live Chat",
      description: "Chat with our support team instantly",
      action: openChatwoot,
      primary: true
    },
    {
      icon: FiPhone,
      title: "Call Us",
      description: "+91 1800-123-4567 (Toll Free)",
      action: () => window.open('tel:+911800123456')
    },
    {
      icon: FiMail,
      title: "Email Support",
      description: "support@yourstore.com",
      action: () => window.open('mailto:support@yourstore.com')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiArrowLeft className="text-xl text-gray-600" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-gray-800">Help & Support</h1>
            <p className="text-sm text-gray-500">We're here to help you</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Quick Support Options */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
            <FiHelpCircle className="text-blue-600" />
            <span>Get Quick Help</span>
          </h2>
          
          <div className="space-y-3">
            {supportOptions.map((option, index) => (
              <button
                key={index}
                onClick={option.action}
                className={`w-full p-4 rounded-xl border text-left transition-colors ${
                  option.primary
                    ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${
                    option.primary ? 'bg-white/20' : 'bg-blue-50'
                  }`}>
                    <option.icon className={`text-lg ${
                      option.primary ? 'text-white' : 'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-medium ${
                      option.primary ? 'text-white' : 'text-gray-800'
                    }`}>
                      {option.title}
                    </h3>
                    <p className={`text-sm ${
                      option.primary ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {option.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
            <FiBook className="text-green-600" />
            <span>Frequently Asked Questions</span>
          </h2>
          
          <div className="space-y-3">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200">
                <details className="group">
                  <summary className="p-4 cursor-pointer list-none">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-800 group-open:text-blue-600">
                        {faq.question}
                      </h3>
                      <div className="transform transition-transform group-open:rotate-180">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </summary>
                  <div className="px-4 pb-4">
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-3">Additional Resources</h3>
          <div className="space-y-2">
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <FiBook className="text-blue-600" />
                <span className="text-gray-700">User Guide</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <FiSearch className="text-green-600" />
                <span className="text-gray-700">Search Help Articles</span>
              </div>
            </button>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4">
          <h3 className="font-semibold text-blue-800 mb-2">📞 Support Hours</h3>
          <div className="space-y-1 text-sm text-blue-700">
            <p><strong>Live Chat:</strong> 24/7 available</p>
            <p><strong>Phone Support:</strong> Mon-Sat, 9 AM - 8 PM</p>
            <p><strong>Email Support:</strong> We respond within 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportScreen;