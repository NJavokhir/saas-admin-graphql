import type { User, PagedUser } from "./types";

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function asString(v: unknown, fallback: string = ""): string {
  return typeof v === "string" ? v : fallback;
}

function asNumber(v: unknown, fallback: number = 0): number {
  return typeof v === "number" ? v : fallback;
}

export function mapUser(input: unknown): User {
  if (!isRecord(input)) {
    return {
      id: "",
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
    };
  }

  return {
    id: asString(input.id),
    name: asString(input.name),
    username: asString(input.username),
    email: asString(input.email, ""),
    phone: asString(input.phone, ""),
    website: asString(input.website),
  };
}

export function mapPagedUser(input: unknown): PagedUser {
  if (!isRecord(input)) {
    return {
      data: [],
      meta: {
        totalCount: 0,
      },
    };
  }

  const rawData = Array.isArray(input.data) ? input.data : [];
  const rawMeta = isRecord(input.meta) ? input.meta : {};

  const data: User[] = rawData.map(mapUser);

  return {
    data,
    meta: {
      totalCount: asNumber(rawMeta.totalCount),
    },
  };
}
