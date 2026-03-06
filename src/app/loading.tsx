export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0b]" aria-live="polite" aria-busy="true">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-oc-cyan/30 border-t-oc-cyan" />
        <span className="text-sm text-oc-cream-muted">Loading...</span>
      </div>
    </div>
  );
}
