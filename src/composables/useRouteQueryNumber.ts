import { ref, watch, type Ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export function useRouteQueryNumber(
  key: string,
  defaultValue: number,
  opts?: { min?: number; max?: number },
): Ref<number> {
  const route = useRoute();
  const router = useRouter();

  function parse(v: unknown): number {
    const n =
      typeof v === "string" ? Number(v) : Array.isArray(v) ? Number(v[0]) : NaN;
    if (!Number.isFinite(n)) return defaultValue;
    const min = opts?.min ?? -Infinity;
    const max = opts?.max ?? Infinity;
    return Math.min(max, Math.max(min, n));
  }

  const state = ref(parse(route.query[key]));

  watch(
    state,
    (v) => {
      const nextQuery = { ...route.query };

      if (v === defaultValue) {
        delete nextQuery[key];
      } else {
        nextQuery[key] = String(v);
      }

      router.replace({ query: nextQuery });
    },
    { flush: "post" },
  );

  return state;
}
