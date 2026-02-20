import { useQuery } from "@vue/apollo-composable";
import { computed, toValue, type Ref } from "vue";
import { GET_SAMPLE_USER } from "../../graphql/queries/user.queries";
import type { User } from "../../domain/types";
import { mapUser } from "../../domain/mappers";

export function useSampleUserQuery(id: string | Ref<string>) {
  const variables = computed(() => ({ id: toValue(id) }));

  const query = useQuery(GET_SAMPLE_USER, variables);

  const user = computed<User | null>(() => {
    const raw = query.result.value?.user;
    return raw ? mapUser(raw) : null;
  });

  return {
    user,
    loading: query.loading,
    error: query.error,
    refetch: query.refetch,
  };
}
