import { getAllWholesaleInquiries } from "@/lib/data/wholesale";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function AdminWholesalePage() {
  const inquiries = await getAllWholesaleInquiries();

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold">Demandes Grossistes</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Entreprise</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Téléphone</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Volume estimé</TableHead>
            <TableHead>Statut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inquiries.map((inquiry) => (
            <TableRow key={inquiry.id}>
              <TableCell className="font-semibold">{inquiry.companyName}</TableCell>
              <TableCell>{inquiry.contactName}</TableCell>
              <TableCell>{inquiry.phone}</TableCell>
              <TableCell className="capitalize">{inquiry.businessType.replace("_", " ")}</TableCell>
              <TableCell>{inquiry.estimatedVolume}</TableCell>
              <TableCell>
                <Badge variant="secondary">{inquiry.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
