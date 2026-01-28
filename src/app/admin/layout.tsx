export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav>{/* Admin navigation */}</nav>
      <main>{children}</main>
    </div>
  );
}
