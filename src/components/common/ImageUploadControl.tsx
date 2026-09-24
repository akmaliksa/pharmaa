import React, { useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Trash2, FolderOpen } from 'lucide-react';
import { useCms } from '../../context/CmsContext';

interface ImageUploadControlProps {
  label?: string;
  value?: string;
  onChange: (url: string) => void;
  helperText?: string;
  className?: string;
}

export const ImageUploadControl: React.FC<ImageUploadControlProps> = ({
  label = 'Image Asset',
  value,
  onChange,
  helperText,
  className = '',
}) => {
  const { media, addMediaItem } = useCms();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (!dataUrl) return;

      // Update current image
      onChange(dataUrl);

      // Also save to media library so it's reusable
      const newItem = {
        id: `media_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        name: file.name,
        url: dataUrl,
        type: 'image' as const,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        mimeType: file.type,
        alt: file.name.replace(/\.[^/.]+$/, ''),
        createdAt: new Date().toISOString(),
      };
      addMediaItem(newItem);
    };

    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={`space-y-2 text-xs ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="font-semibold text-neutral-300">{label}</label>
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-neutral-500 hover:text-red-400 flex items-center gap-1 text-[11px] transition-colors"
              title="Remove image"
            >
              <Trash2 className="w-3 h-3" />
              <span>Remove</span>
            </button>
          )}
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Preview Card */}
      {value ? (
        <div className="relative group rounded-lg overflow-hidden border border-[#2F2F2F] bg-[#0E0E0E]">
          <img
            src={value}
            alt="Preview"
            className="w-full h-36 object-cover object-center transition-transform group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-[#C5A880] text-black font-semibold rounded text-xs hover:bg-[#D4AF37] transition-colors flex items-center gap-1.5 shadow"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Replace Image</span>
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="px-2.5 py-1.5 bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-700 rounded text-xs transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Upload Drag & Drop Trigger */
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-[#2F2F2F] hover:border-[#C5A880] bg-[#101010] hover:bg-[#151515] rounded-lg p-5 text-center cursor-pointer transition-all group"
        >
          <div className="w-10 h-10 rounded-full bg-[#1A1A1A] group-hover:bg-[#C5A880]/10 border border-[#2E2E2E] group-hover:border-[#C5A880]/40 flex items-center justify-center mx-auto mb-2 text-neutral-400 group-hover:text-[#C5A880] transition-colors">
            <UploadCloud className="w-5 h-5" />
          </div>
          <span className="font-semibold text-white block mb-0.5">
            Upload Picture from Computer
          </span>
          <span className="text-[11px] text-neutral-400 block">
            Click to browse JPG, PNG, WEBP, or SVG
          </span>
        </div>
      )}

      {/* Manual URL / Path Input with Quick Browse */}
      <div className="space-y-1">
        <div className="flex gap-1.5">
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="images/photo.jpg or https://..."
            className="flex-1 p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white focus:border-[#C5A880] outline-none text-xs"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-2 bg-[#1E1E1E] hover:bg-[#282828] text-neutral-200 hover:text-white border border-[#333] hover:border-[#C5A880] rounded transition-colors flex items-center gap-1 shrink-0"
            title="Upload from computer"
          >
            <UploadCloud className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="hidden sm:inline">Upload</span>
          </button>
        </div>
        {helperText && <p className="text-[10px] text-neutral-500">{helperText}</p>}
      </div>

      {/* Quick Select from Media Library */}
      {media.filter((m) => m.type === 'image').length > 0 && (
        <details className="mt-2 text-[11px] text-neutral-400">
          <summary className="cursor-pointer hover:text-[#C5A880] select-none py-1 flex items-center gap-1">
            <FolderOpen className="w-3 h-3 text-[#C5A880]" />
            <span>Or choose from Media Library ({media.filter((m) => m.type === 'image').length} images)</span>
          </summary>
          <div className="grid grid-cols-4 gap-2 pt-2 max-h-36 overflow-y-auto p-1.5 bg-[#090909] rounded border border-[#222]">
            {media
              .filter((m) => m.type === 'image')
              .map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => onChange(item.url)}
                  className={`relative group rounded overflow-hidden h-14 border transition-all ${
                    value === item.url
                      ? 'border-[#C5A880] ring-1 ring-[#C5A880]'
                      : 'border-[#2D2D2D] hover:border-neutral-400'
                  }`}
                  title={item.name}
                >
                  <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                </button>
              ))}
          </div>
        </details>
      )}
    </div>
  );
};
