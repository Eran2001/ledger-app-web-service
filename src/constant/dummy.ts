import {
  Customer,
  InstallmentSchedule,
  Payment,
  PendingRegistration,
  Product,
  Sale,
  User,
} from "../types";
import { addMonths, format } from "date-fns";

export const users: User[] = [
  {
    id: "1",
    name: "Kamal Silva",
    email: "kamal@silvatraders.lk",
    role: "ADMIN",
    status: "active",
    lastLogin: "Today 09:14",
  },
  {
    id: "2",
    name: "Nadeeka Perera",
    email: "nadeeka@silvatraders.lk",
    role: "STAFF",
    status: "active",
    lastLogin: "Yesterday",
  },
  {
    id: "3",
    name: "Dinesh Rathnayake",
    email: "dinesh@silvatraders.lk",
    role: "VIEWER",
    status: "active",
    lastLogin: "3 days ago",
  },
];

export const pendingRegistrations: PendingRegistration[] = [
  {
    id: "p1",
    name: "Samanthi Fernando",
    email: "samanthi@gmail.com",
    phone: "077-111-2233",
    requestedRole: "STAFF",
    message: "I help at the store on weekends",
    requestedAt: "2 hours ago",
  },
  {
    id: "p2",
    name: "Ruwan Jayasinghe",
    email: "ruwan.j@gmail.com",
    phone: "071-444-5566",
    requestedRole: "VIEWER",
    message: "Owner family member",
    requestedAt: "1 day ago",
  },
];

export const customers: Customer[] = [
  {
    id: "c1",
    fullName: "Nimal Persera",
    phone: "077-123-4567",
    nic: "198812345678",
    address: "12 Perera Mawatha, Colombo 05",
    createdAt: "2025-01-10",
    email: "nimal@gmail.com",
  },
  {
    id: "c2",
    fullName: "Sunethra De Silva",
    phone: "071-234-5678",
    nic: "197654321098",
    address: "34 De Silva Road, Kandy",
    createdAt: "2025-01-15",
  },
  {
    id: "c3",
    fullName: "Anura Kumara",
    phone: "076-345-6789",
    nic: "199034567890",
    address: "78 Kumara Lane, Gampaha",
    createdAt: "2025-02-01",
  },
  {
    id: "c4",
    fullName: "Roshan Fernando",
    phone: "075-456-7890",
    nic: "198523456789",
    address: "56 Fernando Place, Negombo",
    createdAt: "2025-02-10",
  },
  {
    id: "c5",
    fullName: "Dilini Jayawardena",
    phone: "070-567-8901",
    nic: "200112345678",
    address: "90 Jayawardena Road, Matara",
    createdAt: "2025-03-05",
  },
  {
    id: "c6",
    fullName: "Priya Wickrama",
    phone: "078-678-9012",
    nic: "198867890123",
    address: "23 Wickrama Street, Kurunegala",
    createdAt: "2025-03-12",
  },
  {
    id: "c7",
    fullName: "Chamara Bandara",
    phone: "072-789-0123",
    nic: "199245678901",
    address: "45 Bandara Avenue, Ratnapura",
    createdAt: "2025-03-20",
  },
  {
    id: "c8",
    fullName: "Tharaka Samaratunge",
    phone: "074-890-1234",
    nic: "198934567012",
    address: "67 Samaratunge Road, Badulla",
    createdAt: "2025-04-01",
  },
];

export const products: Product[] = [
  {
    id: "pr1",
    name: 'Samsung TV 43"',
    category: "Electronics",
    basePrice: 65000,
    activeSales: 3,
    createdAt: "2025-01-12",
  },
  {
    id: "pr2",
    name: "LG Fridge 250L",
    category: "Appliances",
    basePrice: 48000,
    activeSales: 2,
    createdAt: "2025-01-15",
  },
  {
    id: "pr3",
    name: "Washing Machine",
    category: "Appliances",
    basePrice: 72000,
    activeSales: 4,
    createdAt: "2025-01-20",
  },
  {
    id: "pr4",
    name: "Sofa Set 3+1",
    category: "Furniture",
    basePrice: 85000,
    activeSales: 1,
    createdAt: "2025-01-25",
  },
  {
    id: "pr5",
    name: "Dining Table",
    category: "Furniture",
    basePrice: 52000,
    activeSales: 2,
    createdAt: "2025-02-01",
  },
  {
    id: "pr6",
    name: "Sony Speaker",
    category: "Electronics",
    basePrice: 22500,
    activeSales: 1,
    createdAt: "2025-02-05",
  },
  {
    id: "pr7",
    name: "Air Cooler",
    category: "Appliances",
    basePrice: 18500,
    activeSales: 3,
    createdAt: "2025-02-10",
  },
  {
    id: "pr8",
    name: "Water Pump",
    category: "Hardware",
    basePrice: 14000,
    activeSales: 1,
    createdAt: "2025-02-14",
  },
];

export const sales: Sale[] = [
  {
    id: "s1",
    customerId: "c1",
    productId: "pr1",
    soldPrice: 65000,
    downPayment: 15000,
    monthlyAmount: 5000,
    totalMonths: 10,
    saleDate: "2025-07-18",
    status: "ACTIVE",
  },
  {
    id: "s2",
    customerId: "c2",
    productId: "pr2",
    soldPrice: 48000,
    downPayment: 12000,
    monthlyAmount: 4500,
    totalMonths: 8,
    saleDate: "2025-08-10",
    status: "ACTIVE",
  },
  {
    id: "s3",
    customerId: "c3",
    productId: "pr6",
    soldPrice: 22500,
    downPayment: 7500,
    monthlyAmount: 2500,
    totalMonths: 6,
    saleDate: "2025-09-01",
    status: "ACTIVE",
  },
  {
    id: "s4",
    customerId: "c4",
    productId: "pr3",
    soldPrice: 72000,
    downPayment: 12000,
    monthlyAmount: 6000,
    totalMonths: 10,
    saleDate: "2025-09-15",
    status: "ACTIVE",
  },
  {
    id: "s5",
    customerId: "c5",
    productId: "pr4",
    soldPrice: 85000,
    downPayment: 25000,
    monthlyAmount: 7500,
    totalMonths: 8,
    saleDate: "2025-06-01",
    status: "COMPLETED",
  },
  {
    id: "s6",
    customerId: "c6",
    productId: "pr5",
    soldPrice: 52000,
    downPayment: 12000,
    monthlyAmount: 5200,
    totalMonths: 8,
    saleDate: "2025-09-20",
    status: "ACTIVE",
  },
  {
    id: "s7",
    customerId: "c7",
    productId: "pr7",
    soldPrice: 18500,
    downPayment: 3500,
    monthlyAmount: 1850,
    totalMonths: 8,
    saleDate: "2025-10-01",
    status: "ACTIVE",
  },
  {
    id: "s8",
    customerId: "c8",
    productId: "pr8",
    soldPrice: 14000,
    downPayment: 2000,
    monthlyAmount: 2800,
    totalMonths: 4,
    saleDate: "2025-11-01",
    status: "ACTIVE",
  },
];

// Generate installments for s1
const generateInstallments = (sale: Sale): InstallmentSchedule[] => {
  const schedules: InstallmentSchedule[] = [];
  const startDate = new Date(sale.saleDate);

  for (let i = 1; i <= sale.totalMonths; i++) {
    const dueDate = addMonths(startDate, i);
    let status: any = "PAID";
    let paidAmount = sale.monthlyAmount;

    if (sale.id === "s1") {
      if (i === 9) {
        status = "PARTIALLY_PAID";
        paidAmount = 3500;
      } else if (i === 10) {
        status = "PENDING";
        paidAmount = 0;
      }
    }

    schedules.push({
      id: `i-${sale.id}-${i}`,
      saleId: sale.id,
      installmentNumber: i,
      dueDate: format(dueDate, "yyyy-MM-dd"),
      expectedAmount: sale.monthlyAmount,
      paidAmount: paidAmount,
      status: status,
    });
  }
  return schedules;
};

export const installmentSchedules: InstallmentSchedule[] = sales.flatMap(
  (sale) => generateInstallments(sale),
);

export const payments: Payment[] = [
  {
    id: "pay1",
    installmentScheduleId: "i-s1-9",
    paidAmount: 3500,
    paidDate: "2026-04-18",
    recordedBy: "Kamal Silva",
    notes: "Customer paid partial",
  },
  {
    id: "pay2",
    installmentScheduleId: "i-s1-8",
    paidAmount: 5000,
    paidDate: "2026-03-18",
    recordedBy: "Kamal Silva",
    notes: "",
  },
  {
    id: "pay3",
    installmentScheduleId: "i-s1-7",
    paidAmount: 5000,
    paidDate: "2026-02-18",
    recordedBy: "Kamal Silva",
    notes: "",
  },
];
