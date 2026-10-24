import { ArrowLeftRight } from 'lucide-react';

function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-600 rounded-md flex items-center justify-center">
              <ArrowLeftRight className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm text-gray-400">© 2026 ConvertIt. All rights reserved.</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-brand-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-brand-600 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
