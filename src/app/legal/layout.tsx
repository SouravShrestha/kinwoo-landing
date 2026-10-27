export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh justify-center">
      <div className="w-full max-w-2xl">{children}</div>
    </div>
  );
}
