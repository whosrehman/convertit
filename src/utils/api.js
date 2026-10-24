import axios from 'axios';

export async function convertWordToPdf(file, onProgress) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post('/api/convert/word-to-pdf', formData, {
    responseType: 'blob',
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (e) => {
      if (onProgress && e.total) {
        onProgress(Math.round((e.loaded / e.total) * 50));
      }
    },
  });

  const fileName = response.headers['x-file-name'] || file.name.replace(/\.(doc|docx)$/i, '.pdf');
  const fileSize = parseInt(response.headers['x-file-size']) || response.data.size;

  return {
    success: true,
    blob: response.data,
    file: {
      name: fileName,
      originalName: fileName,
      size: fileSize,
    },
  };
}

export async function convertPdfToWord(file, onProgress) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post('/api/convert/pdf-to-word', formData, {
    responseType: 'blob',
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (e) => {
      if (onProgress && e.total) {
        onProgress(Math.round((e.loaded / e.total) * 50));
      }
    },
  });

  const fileName = response.headers['x-file-name'] || file.name.replace(/\.pdf$/i, '.docx');
  const fileSize = parseInt(response.headers['x-file-size']) || response.data.size;

  return {
    success: true,
    blob: response.data,
    file: {
      name: fileName,
      originalName: fileName,
      size: fileSize,
    },
  };
}
