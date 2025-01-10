function blobToUrl({ image }: { image: Blob }) {
  if (!image) return

  // Assuming you have a Blob object (e.g., from a file upload or API response)
  const blob = new Blob([image], { type: 'image/png' });

  // Convert the Blob to a URL
  const blobUrl = URL.createObjectURL(blob);

  // // Optionally, if you want to revoke the URL later (for cleanup), you can use:
  // URL.revokeObjectURL(blobUrl);
  
  return blobUrl
}

export default blobToUrl