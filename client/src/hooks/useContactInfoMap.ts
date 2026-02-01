import { trpc } from "@/lib/trpc";
import * as React from "react";

export type ContactInfoKey =
  | "phone"
  | "whatsapp"
  | "email"
  | "location"
  | "instagram"
  | "facebook"
  | "tiktok";

export function useContactInfoMap() {
  const query = trpc.contactInfo.getAll.useQuery(undefined, {
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  const map = React.useMemo(() => {
    const m = new Map<string, string>();
    (query.data ?? []).forEach((row) => {
      if (row?.key) m.set(row.key, row.value ?? "");
    });
    return m;
  }, [query.data]);

  const get = React.useCallback(
    (key: ContactInfoKey, fallback: string) => {
      const v = map.get(key);
      return v && v.trim().length > 0 ? v : fallback;
    },
    [map]
  );

  return {
    ...query,
    map,
    get,
  };
}
