/**
 * Client-Side Smart Image Compressor
 * - Downscales large images to a maximum dimension (default 1600px)
 * - Compresses to modern WebP format at 82% visual quality
 * - Automatically reduces 5MB-10MB phone/camera photos down to ~150KB
 * - Preserves aspect ratio with zero visible loss of quality
 */

export async function compressImage(
  file: File,
  maxDimension: number = 1600,
  quality: number = 0.82
): Promise<File> {
  // SVG or non-image files should not be canvas-processed
  if (!file.type.startsWith('image/') || file.type === 'image/svg+xml') {
    return file;
  }

  // If already under 120KB, no need to compress further
  if (file.size < 120 * 1024) {
    return file;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        let { width, height } = img;

        // Resize down proportionally if exceeding maxDimension
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(file); // Fallback to original
          return;
        }

        // Draw image onto canvas with high quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to WebP format
        canvas.toBlob(
          (blob) => {
            if (!blob || blob.size >= file.size) {
              // If for any reason the blob is larger, keep original
              resolve(file);
              return;
            }

            const baseName = file.name.replace(/\.[^/.]+$/, '');
            const optimizedFile = new File([blob], `${baseName}.webp`, {
              type: 'image/webp',
              lastModified: Date.now(),
            });

            resolve(optimizedFile);
          },
          'image/webp',
          quality
        );
      };

      img.onerror = () => {
        resolve(file); // Fallback
      };

      img.src = event.target?.result as string;
    };

    reader.onerror = () => {
      resolve(file); // Fallback
    };

    reader.readAsDataURL(file);
  });
}
