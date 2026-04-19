import { useRef, useState } from "react";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  value?: string | null;
  onChange: (file: File) => void;
  accept?: string;
  maxSizeMB?: number;
  hint?: string;
}

const ImageUpload = ({
  value,
  onChange,
  accept = "image/svg+xml,image/png,image/jpeg,image/gif",
  maxSizeMB = 3,
  hint = "SVG, PNG, JPG or GIF (max. 800×400px)",
}: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = (file: File): boolean => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File must be under ${maxSizeMB}MB`);
      return false;
    }
    setError(null);
    return true;
  };

  const handleFile = (file: File) => {
    if (validate(file)) onChange(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="flex items-center gap-4">

      <div className="relative w-16 h-16 shrink-0">

        <div
          className="w-full h-full global-rounded border-2 border-dashed border-border bg-muted flex items-center justify-center cursor-pointer overflow-hidden"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          {value ? (
            <img src={value} alt="Logo preview" className="w-full h-full object-cover" />
          ) : (
            <Icon.ImagePlus className="w-6 h-6 text-muted-foreground/50" />
          )}

          {dragOver && (
            <div className="absolute inset-0 bg-primary/10 global-rounded" />
          )}
        </div>

        <div className="absolute bottom-0 right-0 w-5 h-5 global-rounded bg-primary flex items-center justify-center ring-2 ring-background pointer-events-none">
          <Icon.Pencil className="w-2.5 h-2.5 text-primary-foreground" />
        </div>

      </div>

      <div className="flex-1 min-w-0">
        {error && <p className="form-error mt-1">{error}</p>}
      </div>

      <Button
        type="button"
        variant="outline"
        className="shrink-0"
        onClick={() => inputRef.current?.click()}
      >
        Upload Logo
      </Button>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default ImageUpload;