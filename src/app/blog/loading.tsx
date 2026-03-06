export default function BlogLoading() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="animate-pulse space-y-8">
        <div className="h-10 w-48 rounded bg-white/10" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 rounded-lg bg-white/10" />
          ))}
        </div>
      </div>
    </div>
  );
}
