import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudUpload, FileText, FileType } from 'lucide-react';

function FileDropzone({ type, onFileSelect, disabled }) {
  const isWordToPdf = type === 'word-to-pdf';

  const accept = isWordToPdf
    ? {
        'application/msword': ['.doc'],
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      }
    : { 'application/pdf': ['.pdf'] };

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024, // 50MB
    disabled,
  });

  return (
    <div
      {...getRootProps()}
      className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200
        ${isDragActive
          ? 'border-brand-500 bg-brand-50 scale-[1.01]'
          : 'border-gray-200 hover:border-brand-400 hover:bg-gray-50'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <input {...getInputProps()} />

      <div className="flex flex-col items-center gap-4">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
            isDragActive ? 'bg-brand-100' : 'bg-brand-50'
          }`}
        >
          <CloudUpload
            className={`w-8 h-8 transition-colors ${isDragActive ? 'text-brand-600' : 'text-brand-500'}`}
          />
        </div>

        <div>
          <p className="text-lg font-medium text-gray-800">
            {isDragActive
              ? 'Drop it here!'
              : isWordToPdf
              ? 'Drop your Word file here'
              : 'Drop your PDF file here'}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            {isWordToPdf ? '.doc, .docx' : '.pdf'} — up to 50 MB
          </p>
        </div>

        <button
          type="button"
          className="bg-brand-600 hover:bg-brand-700 text-white font-medium px-8 py-2.5 rounded-xl transition-colors shadow-sm hover:shadow-md"
        >
          Browse files
        </button>
      </div>
    </div>
  );
}

export default FileDropzone;
