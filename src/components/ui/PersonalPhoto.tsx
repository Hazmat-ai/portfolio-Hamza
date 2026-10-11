"use client";
import Image from "next/image";
import { useState } from "react";
import { personalPhotos } from "@/data/personalPhotos";
export function PersonalPhoto({ slot }: { slot: "about" | "workbench" }) {
  const [failed, setFailed] = useState(false);
  const photo = personalPhotos[slot];
  if (!photo || failed) return null;
  return (
    <figure className="personal-photo">
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes="(max-width: 767px) calc(100vw - 48px), 1120px"
        onError={() => setFailed(true)}
      />
    </figure>
  );
}
