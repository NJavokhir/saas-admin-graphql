import type { User } from "./types";

function isRecord(v: unknown): v is Record<string, unknown> {
    return typeof v === "object" && v !== null;
}

function asString(v: unknown, fallback: string = ""): string {
    return typeof v === "string" ? v : fallback;
}

export function mapUser(input: unknown): User {
    if (!isRecord(input)) {
        return {
            id: "",
            name: "",
            username: "",
        };
    }

    return {
        id: asString(input.id),
        name: asString(input.name),
        username: asString(input.username),
    };
}
