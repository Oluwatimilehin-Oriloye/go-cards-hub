import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, User } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";

interface EditProfilePictureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditProfilePictureModal({ isOpen, onClose }: EditProfilePictureModalProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!preview) {
      toast.error("Please select an image");
      return;
    }

    toast.success("Profile picture updated successfully");
    handleClose();
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setPreview(null);
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Profile Picture</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Upload a new profile picture
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 py-6">
          <Avatar className="h-32 w-32">
            {preview ? (
              <AvatarImage src={preview} alt="Preview" />
            ) : (
              <AvatarFallback className="bg-primary text-primary-foreground">
                <User className="h-16 w-16" />
              </AvatarFallback>
            )}
          </Avatar>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="w-full"
          >
            <Upload className="mr-2 h-4 w-4" />
            Choose Image
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Recommended: Square image, at least 400x400px, max 5MB
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
