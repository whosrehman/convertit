import { Download, CheckCircle, FileText, FileType, RotateCcw } from 'lucide-react';
import { formatFileSize } from '../utils/fileHelpers';

function DownloadReady({ result, type, onReset }) {
  const isWordToPdf = type === 'word-to-pdf';

  const handleDownload = () => {
    const url = URL.createObjectURL(result.blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = result.file.originalName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      {/* Success header */}
      <div className="flex items-center gap-2 mb-5">
        <CheckCircle className="w-5 h-5 text-green-500" />
        <p className="text-sm font-medium text-green-600">Conversion complete!</p>
      </div>

      {/* File info */}
      <div className="flex items-center gap-4 mb-5">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
          isWordToPdf ? 'bg-red-50' : 'bg-blue-50'
        }`}>
          {isWordToPdf ? (
            <FileType className="w-6 h-6 text-red-500" />
          ) : (
            <FileText className="w-6 h-6 text-blue-500" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate">{result.file.originalName}</p>
          <p className="text-xs text-gray-400">{formatFileSize(result.file.size)}</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-medium py-3 px-4 rounded-xl transition-colors shadow-sm hover:shadow-md"
        >
          <Download className="w-4 h-4" />
          Download {isWordToPdf ? 'PDF' : 'Word'}
        </button>
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 border border-gray-200 text-gray-600 hover:text-gray-800 hover:bg-gray-50 font-medium py-3 px-4 rounded-xl transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          New
        </button>
      </div>
    </div>
  );
}

export default DownloadReady;
