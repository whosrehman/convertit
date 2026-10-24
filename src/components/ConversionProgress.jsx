import { FileText, FileType, Loader2 } from 'lucide-react';
import { formatFileSize } from '../utils/fileHelpers';

function ConversionProgress({ file, progress, type }) {
  const isWordToPdf = type === 'word-to-pdf';

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
          isWordToPdf ? 'bg-blue-50' : 'bg-red-50'
        }`}>
          {isWordToPdf ? (
            <FileText className="w-6 h-6 text-blue-500" />
          ) : (
            <FileType className="w-6 h-6 text-red-500" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
          <p className="text-xs text-gray-400">{formatFileSize(file.size)}</p>
        </div>
        <Loader2 className="w-5 h-5 text-brand-500 animate-spin flex-shrink-0" />
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-brand-600 font-medium mt-2">
        {progress < 50 ? 'Uploading...' : 'Converting...'} {progress}%
      </p>
    </div>
  );
}

export default ConversionProgress;
