import { services as allServices } from "@/lib/site-config";
import { ServiceCard } from "./ServiceCard";

export function ServicesGrid({ limit }: { limit?: number }) {
  // Some services share a destination page (e.g. API Testing and Database
  // Validation both live on /test-automation) but are still distinct
  // offerings worth their own card on overview grids.
  const items = limit ? allServices.slice(0, limit) : allServices;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
