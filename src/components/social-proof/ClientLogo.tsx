"use client";

import { clients } from "@/data/clients";
import { PlaceholderLogo } from "./PlaceholderLogos";
import { cn } from "@/lib/utils";

interface ClientLogoProps {
  clients?: typeof clients;
  columns?: 4 | 5 | 6;
  className?: string;
}

export function ClientLogo({
  clients: customClients,
  columns = 5,
  className,
}: ClientLogoProps) {
  const clientList = customClients ?? clients;

  return (
    <div
      className={cn(
        "grid gap-8 md:gap-12 items-center justify-items-center",
        columns === 4 && "grid-cols-2 md:grid-cols-4",
        columns === 5 && "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
        columns === 6 && "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
        className
      )}
    >
      {clientList.map((client) => (
        <div
          key={client.id}
          className="flex items-center justify-center w-full max-w-[140px] h-12 text-muted-foreground/70 hover:text-foreground/90 transition-colors duration-300"
          title={client.name}
        >
          <PlaceholderLogo logoId={client.logoId} className="w-full h-8 object-contain" />
        </div>
      ))}
    </div>
  );
}
