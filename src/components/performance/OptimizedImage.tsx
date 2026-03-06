"use client";

import Image, { type ImageProps } from "next/image";

const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBRIhMQYTQVH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABoRAAICAwAAAAAAAAAAAAAAAAECAAMRITH/2gAMAwEAAhEDEEA/AL3kGqX1pqk0NvcyxRqFwqNgdCiiqN3f3U1zLJJcSs7MSxLkkn3RRVbWY9iKqg8E/9k=";

export interface OptimizedImageProps extends Omit<ImageProps, "placeholder" | "blurDataURL"> {
  /** Use blur placeholder for better perceived performance */
  withBlur?: boolean;
  /** Custom blur data URL - defaults to subtle gray placeholder */
  blurDataURL?: string;
  /** Disable lazy loading for above-the-fold images */
  priority?: boolean;
  /** For Radix Avatar compatibility - called with 'loaded' or 'error' */
  onLoadingStatusChange?: (status: "idle" | "loading" | "loaded" | "error") => void;
}

export function OptimizedImage({
  src,
  alt,
  withBlur = true,
  blurDataURL,
  priority = false,
  loading,
  sizes,
  className,
  onLoadingStatusChange,
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) {
  const effectiveLoading = priority ? undefined : loading ?? "lazy";
  const placeholderData = withBlur ? (blurDataURL ?? BLUR_DATA_URL) : undefined;

  return (
    <Image
      src={src}
      alt={alt}
      priority={priority}
      loading={effectiveLoading}
      placeholder={placeholderData ? "blur" : "empty"}
      blurDataURL={placeholderData}
      sizes={sizes ?? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
      className={className}
      onLoad={(e) => {
        onLoadingStatusChange?.("loaded");
        onLoad?.(e);
      }}
      onError={() => {
        onLoadingStatusChange?.("error");
        onError?.();
      }}
      {...props}
    />
  );
}
