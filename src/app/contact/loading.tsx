export default function ContactLoading() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mx-auto max-w-xl animate-pulse space-y-8">
        <div className="h-10 w-48 rounded bg-white/10" />
        <div className="space-y-4">
          <div className="h-12 rounded bg-white/10" />
          <div className="h-12 rounded bg-white/10" />
          <div className="h-32 rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
}
