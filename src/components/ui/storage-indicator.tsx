import { Database, HardDrive } from "lucide-react";
import { projectStorage } from "@/lib/projectStorage";

export const StorageIndicator = () => {
  const isUsingSupabase = projectStorage.isUsingSupabase();

  if (isUsingSupabase) {
    return (
      <div className="inline-flex items-center gap-1.5 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
        <Database size={12} />
        <span>Supabase</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
      <HardDrive size={12} />
      <span>LocalStorage</span>
    </div>
  );
};
