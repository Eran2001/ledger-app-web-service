import { useRef, type ChangeEvent } from "react";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SyncedHeightPair } from "@/components/shared/synced-height-pair";

interface AvatarUploadProps {
  imageUrl: string | null;
  onImageChange: (dataUrl: string | null) => void;
}

export function AvatarUpload({ imageUrl, onImageChange }: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onImageChange(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function handleTrigger() {
    inputRef.current?.click();
  }

  return (
    <Card shadow border>
      <CardContent>
        <div className="flex flex-col xs:flex-row items-center gap-4">
          <SyncedHeightPair
            squareLeft
            className="w-full max-w-xl flex-1"
            left={
              <button
                type="button"
                onClick={handleTrigger}
                className="btn-ghost global-rounded border-stroke border-default cursor-pointer inline-flex items-center justify-center overflow-hidden border-dashed"
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Uploaded"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Icon.ImagePlus className="text-faint" />
                )}
              </button>
            }
            right={
              <div className="flex flex-col items-center text-center xs:items-start xs:text-left gap-0.5">
                <span className="t-label-md-bold">Upload image</span>
                <span className="t-label-md text-faint">
                  Drag and drop or choose a file.
                </span>
                <span className="t-label-md text-faint">
                  SVG, PNG, JPG or GIF (max. 800×400px)
                </span>
              </div>
            }
          />

          <Button type="button" variant="outline" onClick={handleTrigger}>
            <Icon.Upload />
            <span className="inline xs:hidden md:inline">
              {imageUrl ? "Replace" : "Upload image"}
            </span>
          </Button>

          <Input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleFileChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}
