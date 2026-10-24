import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ToolSelector from '../components/ToolSelector';
import FileDropzone from '../components/FileDropzone';
import ConversionProgress from '../components/ConversionProgress';
import DownloadReady from '../components/DownloadReady';
import ErrorMessage from '../components/ErrorMessage';
import { convertWordToPdf, convertPdfToWord } from '../utils/api';

// States: idle, uploading, converting, done, error
function ConvertPage({ type }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('idle');
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const isWordToPdf = type === 'word-to-pdf';

  // If navigated here with a file from homepage
  useEffect(() => {
    if (location.state?.file) {
      handleConvert(location.state.file);
      // Clear the state so it doesn't re-trigger
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleConvert = useCallback(async (selectedFile) => {
    setFile(selectedFile);
    setStatus('uploading');
    setProgress(0);
    setError('');
    setResult(null);

    try {
      const onProgress = (pct) => {
        setProgress(pct);
        if (pct >= 50) setStatus('converting');
      };

      // Simulate conversion progress after upload completes
      const convertFn = isWordToPdf ? convertWordToPdf : convertPdfToWord;

      // Start a progress simulation for the conversion phase
      let progressInterval;
      const startConversionProgress = () => {
        let currentProgress = 50;
        progressInterval = setInterval(() => {
          currentProgress += Math.random() * 8;
          if (currentProgress >= 95) {
            currentProgress = 95;
            clearInterval(progressInterval);
          }
          setProgress(Math.round(currentProgress));
        }, 300);
      };

      const response = await convertFn(selectedFile, (uploadProgress) => {
        setProgress(uploadProgress);
        if (uploadProgress >= 50 && !progressInterval) {
          setStatus('converting');
          startConversionProgress();
        }
      });

      // Clear interval and complete
      if (progressInterval) clearInterval(progressInterval);
      setProgress(100);
      setResult(response);
      setStatus('done');
    } catch (err) {
      const message =
        err.response?.data?.error || err.message || 'Something went wrong. Please try again.';
      setError(message);
      setStatus('error');
    }
  }, [isWordToPdf]);

  const handleFileSelect = (selectedFile) => {
    handleConvert(selectedFile);
  };

  const handleReset = () => {
    setStatus('idle');
    setFile(null);
    setProgress(0);
    setResult(null);
    setError('');
  };

  const handleToolSwitch = (newType) => {
    handleReset();
    navigate(`/${newType}`);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

      <div className="relative max-w-xl mx-auto px-4 sm:px-6 pt-12 pb-16">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight mb-3">
            {isWordToPdf ? 'Word to PDF' : 'PDF to Word'}
          </h1>
          <p className="text-gray-500">
            {isWordToPdf
              ? 'Convert your Word documents to PDF format in seconds.'
              : 'Convert your PDF files to editable Word documents.'}
          </p>
        </div>

        {/* Tool selector */}
        <div className="flex justify-center mb-8">
          <ToolSelector activeType={type} onSelect={handleToolSwitch} />
        </div>

        {/* Main content area */}
        <div className="space-y-4">
          {status === 'idle' && (
            <FileDropzone type={type} onFileSelect={handleFileSelect} />
          )}

          {(status === 'uploading' || status === 'converting') && file && (
            <ConversionProgress file={file} progress={progress} type={type} />
          )}

          {status === 'done' && result && (
            <DownloadReady result={result} type={type} onReset={handleReset} />
          )}

          {status === 'error' && (
            <ErrorMessage message={error} onRetry={handleReset} />
          )}
        </div>

        {/* Info note */}
        <p className="text-center text-xs text-gray-400 mt-8">
          Your files are encrypted in transit and automatically deleted after 1 hour.
        </p>
      </div>
    </div>
  );
}

export default ConvertPage;
