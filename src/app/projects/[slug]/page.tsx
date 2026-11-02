import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CasePage } from "@/components/convergence/CasePage";
import content from "@/data/convergence/content.json";
const cases: Record<string, string[]> = content.caseContent;
const key = (slug: string) => (slug === "asl-recognition" ? "asl" : slug);
export function generateStaticParams() {
  return Object.keys(cases).map((slug) => ({
    slug: slug === "asl" ? "asl-recognition" : slug,
  }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = cases[key(slug)];
  return entry
    ? { title: entry[0], alternates: { canonical: `/projects/${slug}` } }
    : {};
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!cases[key(slug)]) notFound();
  return <CasePage slug={slug} />;
}
