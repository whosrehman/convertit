import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ToolSelector from '../components/ToolSelector';
import FileDropzone from '../components/FileDropzone';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';

function HomePage() {
  const [activeType, setActiveType] = useState('word-to-pdf');
  const navigate = useNavigate();

  const handleFileSelect = (file) => {
    // Navigate to conversion page with the file
    navigate(`/${activeType}`, { state: { file } });
  };

  const handleToolSelect = (type) => {
    setActiveType(type);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-50/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-12 text-center">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-1.5 rounded-full text-xs text-gray-500 mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
            100% free — no signup needed
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 tracking-tight leading-tight mb-4">
            Convert your docs,
            <br />
            <span className="text-brand-600">not your patience</span>
          </h1>

          <p className="text-lg text-gray-500 max-w-lg mx-auto mb-8 leading-relaxed">
            Word to PDF. PDF to Word. Drop a file and download the result — fast, private, and free.
          </p>

          {/* Tool selector */}
          <div className="mb-10">
            <ToolSelector activeType={activeType} onSelect={handleToolSelect} />
          </div>

          {/* Dropzone */}
          <div className="max-w-xl mx-auto">
            <FileDropzone type={activeType} onFileSelect={handleFileSelect} />
          </div>
        </div>
      </section>

      {/* How it works */}
      <HowItWorks />

      {/* Features */}
      <Features />
    </div>
  );
}

export default HomePage;
