import { ref, watch, type Ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export function useRouteQueryString(
  key: string,
  defaultValue = "",
): Ref<string> {
  const route = useRoute();
  const router = useRouter();

  function parse(v: unknown): string {
    if (typeof v === "string") return v;
    if (Array.isArray(v) && typeof v[0] === "string") return v[0];
    return defaultValue;
  }

  const state = ref(parse(route.query[key]));

  watch(
    () => route.query[key],
    (v) => {
      state.value = parse(v);
    },
  );

  watch(
    state,
    (v) => {
      const nextQuery = { ...route.query };

      if (!v || v === defaultValue) {
        delete nextQuery[key];
      } else {
        nextQuery[key] = v;
      }

      router.replace({ query: nextQuery });
    },
    { flush: "post" },
  );

  return state;
}
