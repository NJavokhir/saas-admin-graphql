import type { ApolloError } from "@apollo/client/core";

export function normalizeApolloError(error: unknown): string {
    if (!error) return "No error";

    const apollo = error as Partial<ApolloError>;

    const networkMessage = (apollo.networkError as any)?.message || (apollo.networkError as any)?.result?.message;

    if (networkMessage) return `Network error: ${networkMessage}`;

    const graphQLErrors = apollo.graphQLErrors;
    if (graphQLErrors && graphQLErrors.length > 0) {
        return `GraphQL error: ${graphQLErrors.map(e => e.message).join(", ")}`;
    }

    const anyError = error as any;
    if (typeof anyError.message === "string") {
        return `Error: ${anyError.message}`;
    }

    return "An unknown error occurred";
}
