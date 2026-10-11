/** Only owner-supplied photos belong here. Empty slots are not rendered. */
export interface PersonalPhotoAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}
export const personalPhotos: Partial<
  Record<"about" | "workbench", PersonalPhotoAsset>
> = {};
