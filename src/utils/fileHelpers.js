export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export function getFileExtension(filename) {
  return filename.slice(filename.lastIndexOf('.')).toLowerCase();
}

export function isWordFile(file) {
  const ext = getFileExtension(file.name);
  return ['.doc', '.docx'].includes(ext);
}

export function isPdfFile(file) {
  const ext = getFileExtension(file.name);
  return ext === '.pdf';
}
