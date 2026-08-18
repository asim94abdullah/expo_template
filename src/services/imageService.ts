export function getFileNameFromUri(uri: string): string {
  const segments = uri.split('/');
  return segments[segments.length - 1] ?? 'image.jpg';
}

export function getImageMimeType(uri: string): string {
  const extension = getFileNameFromUri(uri).split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'heic':
      return 'image/heic';
    default:
      return 'image/jpeg';
  }
}

export function createImageFormData(uri: string, fieldName = 'image'): FormData {
  const formData = new FormData();
  const name = getFileNameFromUri(uri);

  formData.append(fieldName, {
    uri,
    name,
    type: getImageMimeType(uri),
  } as unknown as Blob);

  return formData;
}

export const imageService = {
  getFileNameFromUri,
  getImageMimeType,
  createImageFormData,
};
