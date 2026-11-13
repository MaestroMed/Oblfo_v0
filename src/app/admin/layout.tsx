import "../globals.css";

// Racine à part : le back-office n'a ni langue, ni en-tête du site, ni suivi.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="on-cream min-h-screen">{children}</body>
    </html>
  );
}
