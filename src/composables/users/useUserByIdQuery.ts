import { useQuery } from "@vue/apollo-composable";
import { GET_USER_BY_ID } from "../../graphql/queries/user.queries";
import type { User } from "../../domain/types";
import { mapUser } from "../../domain/mappers";
import { type Ref, computed } from "vue";

export function useUserByIdQuery(id: Ref<string>) {
  const variables = computed(() => ({
    id: id.value,
  }));

  const query = useQuery(GET_USER_BY_ID, variables);

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
