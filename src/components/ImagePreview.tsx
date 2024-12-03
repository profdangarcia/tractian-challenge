import Image from "next/image";
import { useEffect, useState } from "react";
import { RiInbox2Line } from "react-icons/ri";

import { useAssets } from "../contexts/AssetsContext";

export default function ImagePreview() {
  const [isHovering, setIsHovering] = useState(false);
  const [file, setFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer>("");
  const { selectedItem } = useAssets();

  useEffect(() => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = function (e) {
        setPreviewUrl(e.target?.result || "");
      };

      reader.readAsDataURL(file);
    }
  }, [file]);

  useEffect(() => {
    setFile(undefined);
    setPreviewUrl("");
  }, [selectedItem]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
    setIsHovering(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    setIsHovering(true);
  };

  const handleDragLeave = () => {
    setIsHovering(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target?.files ? event.target?.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleClick = () => {
    document.getElementById("file-input")!.click();
  };

  return !previewUrl ? (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
      className={`min-h-56 rounded bg-blue-50 h-full border-2 border-dashed border-primary cursor-pointer text-center flex items-center flex-col gap-2 justify-center transition-opacity duration-200 ${
        isHovering ? "opacity-60" : ""
      }`}
    >
      <input
        type="file"
        id="file-input"
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
      />
      <button className="bg-none rounded-full">
        <RiInbox2Line className="text-5xl text-primary" />
      </button>
      <p className="text-sm text-primary">Adicionar imagem do Ativo</p>
    </div>
  ) : (
    <div className="relative w-full min-h-56 rounded border-2 border-gray-200">
      <Image
        src={String(previewUrl)}
        alt={file?.name || ""}
        fill
        className="object-cover"
      />
    </div>
  );
}
