import { ref, watch, type Ref } from "vue";

export function useDebouncedRef<T>(source: Ref<T>, delayMs = 300) {
  const debounced = ref(source.value) as Ref<T>;
  let timer: number | undefined;

  watch(
    source,
    (v) => {
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        debounced.value = v;
      }, delayMs);
    },
    { immediate: true },
  );

  return debounced;
}
