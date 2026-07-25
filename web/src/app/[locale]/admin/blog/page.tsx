import { getAllBlogPostsForAdmin } from "@/lib/data/blog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default async function AdminBlogPage() {
  const posts = await getAllBlogPostsForAdmin();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-extrabold">Gestion du Blog</h1>
        <Button size="sm">+ Nouvel article</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Auteur</TableHead>
            <TableHead>Publié le</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-semibold">{post.title.fr}</TableCell>
              <TableCell>{post.category}</TableCell>
              <TableCell>{post.author.name}</TableCell>
              <TableCell>{new Date(post.publishedAt).toLocaleDateString("fr")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
