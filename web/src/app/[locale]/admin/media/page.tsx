import { Button } from "@/components/ui/button";

const PLACEHOLDER_MEDIA = [
  { icon: "🦜", type: "image" },
  { icon: "🐱", type: "image" },
  { icon: "🐶", type: "image" },
  { icon: "🎥", type: "video" },
  { icon: "🎥", type: "video" },
  { icon: "🐤", type: "image" },
];

export default function AdminMediaPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-extrabold">Médiathèque</h1>
        <Button size="sm">+ Importer un média</Button>
      </div>
      <p className="mb-6 rounded-2xl border bg-muted/40 p-4 text-sm text-muted-foreground">
        Scaffold — branchez ceci sur un stockage réel (Cloudinary, S3, ou Vercel Blob) pour l&apos;upload et la
        gestion des photos/vidéos d&apos;animaux et produits.
      </p>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {PLACEHOLDER_MEDIA.map((media, i) => (
          <div key={i} className="flex aspect-square items-center justify-center rounded-2xl border bg-primary-50 text-3xl">
            {media.icon}
          </div>
        ))}
      </div>
    </div>
  );
}
