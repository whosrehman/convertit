import { FileText, FileType } from 'lucide-react';

function ToolSelector({ activeType, onSelect }) {
  return (
    <div className="inline-flex bg-gray-100 border border-gray-200 rounded-2xl p-1.5 gap-1">
      <button
        onClick={() => onSelect('word-to-pdf')}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
          activeType === 'word-to-pdf'
            ? 'bg-brand-600 text-white shadow-sm'
            : 'text-gray-600 hover:text-gray-900 hover:bg-white'
        }`}
      >
        <FileText className="w-4 h-4" />
        Word → PDF
      </button>
      <button
        onClick={() => onSelect('pdf-to-word')}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
          activeType === 'pdf-to-word'
            ? 'bg-brand-600 text-white shadow-sm'
            : 'text-gray-600 hover:text-gray-900 hover:bg-white'
        }`}
      >
        <FileType className="w-4 h-4" />
        PDF → Word
      </button>
    </div>
  );
}

export default ToolSelector;
