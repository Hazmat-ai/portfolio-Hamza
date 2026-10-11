import type { Metadata } from "next";

const SOCIAL_IMAGE = "/opengraph-image";

/**
 * Next.js shallow-merges metadata across segments, so a page that sets its own
 * `openGraph` or `twitter` object replaces the layout's whole object. Pages
 * therefore need to provide the complete set, or link previews lose their
 * image, site name and title.
 */
export function socialMetadata({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type: "website",
      locale: "en_CA",
      siteName: "Hamza Rizvi Portfolio",
      url: path,
      title,
      description,
      images: [
        {
          url: SOCIAL_IMAGE,
          width: 1200,
          height: 630,
          alt: "Hamza Rizvi - Software Developer Portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SOCIAL_IMAGE],
    },
  };
}
