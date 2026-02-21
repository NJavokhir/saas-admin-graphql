import { useQuery } from "@vue/apollo-composable";
import { computed, toValue, type Ref } from "vue";
import { GET_USERS } from "../../graphql/queries/user.queries";
import type { User, PagedUser } from "../../domain/types";
import { mapPagedUser } from "../../domain/mappers";

export function useUserQuery(
  page: Ref<number>,
  limit: Ref<number>,
  q: Ref<string>,
) {
  const variables = computed(() => ({
    page: toValue(page),
    limit: toValue(limit),
    q: q.value.trim(),
  }));

  const query = useQuery(GET_USERS, variables);

  const paged = computed<PagedUser>(() =>
    mapPagedUser(query.result.value?.users),
  );

  const users = computed<User[]>(() => paged.value.data);
  const totalCount = computed<number>(() => paged.value.meta.totalCount);

  const totalPages = computed(() => {
    const l = limit.value || 1;
    return Math.max(Math.ceil(totalCount.value / l));
  });

  const hasPrev = computed(() => page.value > 1);
  const hasNext = computed(() => page.value < totalPages.value);

  return {
    users,
    totalCount,
    totalPages,
    hasPrev,
    hasNext,
    loading: query.loading,
    error: query.error,
    refetch: query.refetch,
  };
}
