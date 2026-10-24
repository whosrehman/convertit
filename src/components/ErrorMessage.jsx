import { AlertCircle, RotateCcw } from 'lucide-react';

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-medium text-red-700">Conversion failed</p>
          <p className="text-sm text-red-500 mt-1">{message}</p>
        </div>
      </div>
      <button
        onClick={onRetry}
        className="mt-4 flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        Try again
      </button>
    </div>
  );
}

export default ErrorMessage;
