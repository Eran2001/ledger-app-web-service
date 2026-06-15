import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { TopBar } from "@/components/shared/top-bar";

const rows = [
  { name: "Alice Johnson", role: "Engineer", status: "Active", amount: "$4,200" },
  { name: "Bob Smith", role: "Designer", status: "Active", amount: "$3,800" },
  { name: "Carol White", role: "Manager", status: "Inactive", amount: "$5,100" },
  { name: "David Lee", role: "Engineer", status: "Active", amount: "$4,500" },
];

const TestPage = () => {
  return (
    <>
      <TopBar pageTitle="Table" pageSubtitle="Test" />
      <div className="p-6">

        <Table>
          <TableCaption>Team members overview</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell className="text-right">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$17,600</TableCell>
            </TableRow>
          </TableFooter>
        </Table>

      </div>
    </>
  );
};

export default TestPage;
