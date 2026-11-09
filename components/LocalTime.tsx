"use client";

import { useEffect, useState } from "react";

/** Live clock for a given time zone (rendered after mount to avoid hydration mismatch). */
export default function LocalTime({ timeZone }: { timeZone: string }) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, [timeZone]);

  return <time suppressHydrationWarning>{now ?? "—"}</time>;
}
