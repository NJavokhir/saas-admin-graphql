import { computed, toValue, type Ref } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GET_SAMPLE_USER } from "../../graphql/queries/user.queries";

export function useSampleUserQuery(id: string | Ref<string>) {
    const variables = computed(() => ({ id: toValue(id) }));

    const query = useQuery(GET_SAMPLE_USER, variables);

    return {
        user: computed(() => query.result.value?.user ?? null),
        loading: query.loading,
        error: query.error,
        refetch: query.refetch,
    };
}   
