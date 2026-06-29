export interface PendingRegistration {
  id: string;
  name: string;
  email: string;
  phone: string;
  requestedRole: "STAFF" | "VIEWER";
  message: string;
  requestedAt: string;
}
