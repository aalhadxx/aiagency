export default function BlogPostLoading() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mx-auto max-w-3xl animate-pulse space-y-8">
        <div className="h-12 w-full rounded bg-white/10" />
        <div className="h-4 w-1/3 rounded bg-white/10" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-4 w-full rounded bg-white/10" />
          ))}
        </div>
      </div>
    </div>
  );
}
