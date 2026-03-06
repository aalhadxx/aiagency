export default function ServicesLoading() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="animate-pulse space-y-12">
        <div className="h-12 w-3/4 max-w-xl rounded bg-white/10" />
        <div className="grid gap-8 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 rounded-lg bg-white/10" />
          ))}
        </div>
      </div>
    </div>
  );
}
