function toBlob({ file }: { file: File }) {
  if (!file) return

  // You can create a Blob directly from a File
  const blob = new Blob([file], { type: file.type });
  return blob;
}

export default toBlob