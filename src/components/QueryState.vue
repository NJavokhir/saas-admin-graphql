<template>
  <div>
    <!-- Loading -->
    <div v-if="loading" class="state">
      <div class="spinner" aria-hidden="true"></div>
      <div>
        <div class="stateTitle">{{ loadingTitle }}</div>
        <div class="stateHint">{{ loadingHint }}</div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="state errorState">
      <div class="icon" aria-hidden="true">!</div>
      <div>
        <div class="stateTitle">{{ errorTitle }}</div>
        <div class="stateHint">{{ errorMessage }}</div>

        <div class="actions" v-if="showRetry">
          <button class="btn" type="button" @click="$emit('retry')">
            Retry
          </button>
        </div>
      </div>
    </div>

    <!-- Empty -->
    <div v-else-if="isEmpty" class="state emptyState">
      <div class="icon" aria-hidden="true">∅</div>
      <div>
        <div class="stateTitle">{{ emptyTitle }}</div>
        <div class="stateHint">{{ emptyHint }}</div>

        <div class="actions">
          <slot name="emptyActions" />
        </div>
      </div>
    </div>

    <!-- Success content -->
    <div v-else>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { normalizeApolloError } from "../utils/apolloError";

type Props = {
  loading: boolean;
  error?: unknown;
  isEmpty?: boolean;

  loadingTitle?: string;
  loadingHint?: string;

  errorTitle?: string;

  emptyTitle?: string;
  emptyHint?: string;

  showRetry?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  isEmpty: false,

  loadingTitle: "Loading…",
  loadingHint: "Fetching data from the API",

  errorTitle: "Something went wrong",

  emptyTitle: "No data",
  emptyHint: "Nothing to show here yet",

  showRetry: true,
});

defineEmits<{
  (e: "retry"): void;
}>();

const errorMessage = computed(() => normalizeApolloError(props.error));
</script>

<style scoped>
.state {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 12px;
  border: 1px solid var(--border);
  background: #fff;
  border-radius: 12px;
}

.stateTitle {
  font-weight: 800;
  margin-bottom: 4px;
}

.stateHint {
  font-size: 12px;
  color: var(--muted);
  line-height: 1.4;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid var(--border);
  border-top-color: #111;
  border-radius: 999px;
  animation: spin 0.8s linear infinite;
  margin-top: 2px;
}

.icon {
  width: 22px;
  height: 22px;
  border-radius: 999px;
  border: 1px solid var(--border);
  display: grid;
  place-items: center;
  font-weight: 900;
  margin-top: 1px;
}

.errorState {
  border-color: #f3c0c0;
  background: #fff7f7;
}

.emptyState {
  background: var(--soft);
}

.actions {
  margin-top: 10px;
}

.btn {
  border: 1px solid var(--border);
  background: #fff;
  border-radius: 10px;
  padding: 8px 10px;
  cursor: pointer;
  font-weight: 700;
}

.btn:hover {
  background: #f3f4f6;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
