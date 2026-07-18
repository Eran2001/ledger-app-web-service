import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ComponentType,
  type DragEvent,
} from "react";

import * as Icon from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileDropzoneProps {
  file: File | null;
  icon?: ComponentType<{ className?: string }>;
  hint: string;
  accept?: string;
  onFileSelect: (file: File | null) => void;
  className?: string;
}

function formatFileSize(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileDropzone({
  file,
  icon: DropIcon,
  hint,
  accept = "image/*,.pdf",
  onFileSelect,
  className,
}: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const isImage = Boolean(file?.type.startsWith("image/"));
  const isPdf = file?.type === "application/pdf";

  useEffect(() => {
    if (!file || !isImage) {
      setPreviewUrl(null);
      return undefined;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file, isImage]);

  function handleFiles(files: FileList | null) {
    const nextFile = files?.[0];
    if (!nextFile) return;
    onFileSelect(nextFile);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragOver(false);
    handleFiles(event.dataTransfer.files);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    handleFiles(event.target.files);
    event.target.value = "";
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div
        role={!file ? "button" : undefined}
        tabIndex={!file ? 0 : undefined}
        onClick={!file ? () => inputRef.current?.click() : undefined}
        onKeyDown={(event) => {
          if (!file && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          "border border-dashed lg-rounded cursor-pointer p-4 transition-colors",
          "flex flex-col gap-4 text-left",
          !file && "items-center justify-center py-6 text-center",
          dragOver && "border-brand bg-brand/5",
        )}
      >
        {previewUrl ? (
          <div className="group relative overflow-hidden lg-rounded border border-default">
            <img
              src={previewUrl}
              alt={file?.name ?? "Uploaded preview"}
              className="h-40 w-full object-cover"
            />
            <div className="absolute inset-0 flex items-start justify-end gap-2 bg-black/0 p-3 opacity-0 transition-opacity group-hover:bg-black/20 group-hover:opacity-100">
              <Button
                type="button"
                aria-label="Replace file"
                variant="secondary"
                size="icon"
                onClick={(event) => {
                  event.stopPropagation();
                  inputRef.current?.click();
                }}
              >
                <Icon.RefreshCw className="size-4" />
              </Button>
              <Button
                type="button"
                aria-label="Delete file"
                variant="secondary"
                size="icon"
                onClick={(event) => {
                  event.stopPropagation();
                  onFileSelect(null);
                }}
              >
                <Icon.Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        ) : file ? (
          <div className="flex h-40 w-full items-center justify-center lg-rounded border border-default bg-muted/20">
            <div className="space-y-3 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center full-rounded border border-default bg-white">
                {DropIcon ? (
                  <DropIcon className="size-5 text-brand" />
                ) : (
                  <Icon.FileText className="size-5 text-brand" />
                )}
              </div>
              <p className="t-meta text-main">File attached</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex h-14 w-14 items-center justify-center full-rounded border border-default bg-white">
              {DropIcon ? (
                <DropIcon className="size-7 text-faint" />
              ) : (
                <Icon.Upload className="size-7 text-faint" />
              )}
            </div>
            <div className="space-y-1">
              <p className="t-section text-main">Upload files</p>
              <p className="t-meta text-faint">{hint}</p>
            </div>
            <Button
              type="button"
              variant="outline"
              className="min-w-32"
              onClick={(event) => {
                event.stopPropagation();
                inputRef.current?.click();
              }}
            >
              Browse files
            </Button>
          </>
        )}

        {file ? (
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={isImage ? "info" : "outline"}>
              {isImage
                ? "Preview ready"
                : isPdf
                  ? "PDF attached"
                  : "File attached"}
            </Badge>
            <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="t-meta text-main break-all">{file.name}</p>
              <p className="t-micro text-faint">
                {(file.type || "Unknown type").replace("image/", "")} •{" "}
                {formatFileSize(file.size)}
              </p>
            </div>
          </div>
        ) : null}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={handleInputChange}
      />
    </div>
  );
}
