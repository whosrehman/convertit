import { Link } from 'react-router-dom';
import { ArrowLeftRight } from 'lucide-react';

function Navbar() {
  return (
    <nav className="w-full border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <ArrowLeftRight className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-gray-900">
            Convert<span className="text-brand-600">It</span>
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden sm:flex items-center gap-1">
          <Link
            to="/word-to-pdf"
            className="px-3 py-1.5 text-sm text-gray-600 hover:text-brand-600 rounded-lg hover:bg-brand-50 transition-colors"
          >
            Word → PDF
          </Link>
          <Link
            to="/pdf-to-word"
            className="px-3 py-1.5 text-sm text-gray-600 hover:text-brand-600 rounded-lg hover:bg-brand-50 transition-colors"
          >
            PDF → Word
          </Link>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2">
          <button className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1.5 transition-colors">
            Log in
          </button>
          <button className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium px-5 py-2 rounded-full transition-colors shadow-sm hover:shadow-md">
            Get started free
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
