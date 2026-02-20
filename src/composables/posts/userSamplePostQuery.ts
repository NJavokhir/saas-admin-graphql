import { useQuery } from "@vue/apollo-composable";
import { computed, toValue, type Ref } from "vue";
import { GET_POSTS } from "../../graphql/queries/post.queries";

export function useSamplePostQuery(id: string | Ref<string>) {
    const variables = computed(() => ({ id: toValue(id)}));

    const query = useQuery(GET_POSTS, variables)

    return {
        post: computed(() => query.result.value?.post ?? null),
        loading: query.loading,
        error: query.error,
        refetch: query.refetch,
    }
}