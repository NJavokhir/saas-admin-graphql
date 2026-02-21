<template>
  <div class="card">
    <h2>Welcome to the Users</h2>
    <p>Here you can find more Users</p>

    <label for="" class="control grow">
      <span class="label">Search</span>
      <div class="searchRow">
        <input
          class="input"
          v-model="search"
          placeholder="Search users"
          autocomplete="off"
        />
        <button
          class="btn"
          type="button"
          @click="clearSearch"
          :disabled="!search"
        >
          Clear
        </button>
      </div>
    </label>

    <div class="controls">
      <label class="control">
        <span class="label">Limit</span>
        <select v-model.number="limit">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
        </select>
      </label>
    </div>

    <QueryState
      :loading="loading"
      :error="error"
      :isEmpty="users.length === 0"
      @retry="refetch()"
    >
      <div class="card">
        <div class="table">
          <div class="thead">
            <div>ID</div>
            <div>Name</div>
            <div>Username</div>
          </div>
        </div>

        <button
          class="row rowBtn"
          v-for="u in users"
          :key="u.id"
          @click="openUser(u.id)"
        >
          <div class="mono">{{ u.id }}</div>
          <div class="strong">{{ u.name }}</div>
          <div class="muted">{{ u.username }}</div>
        </button>
      </div>

      <div class="pager">
        <button class="btn" :disabled="!hasPrev" @click="prev">Prev</button>
        <div class="meta">
          Page <b>{{ page }}</b> of <b>{{ totalPages }}</b>
        </div>
        <button class="btn" :disabled="!hasNext" @click="next">Next</button>
      </div>

      <div class="grid">
        <button class="btn" @click="refetch()">Refetch</button>
      </div>
    </QueryState>
  </div>
</template>
<script setup lang="ts">
import { watch } from "vue";
import QueryState from "../components/QueryState.vue";
import { useUserQuery } from "../composables/users/useSampleUserQuery";
import { useRouter } from "vue-router";
import { useDebouncedRef } from "../composables/useDebouncedRef";
import { useRouteQueryString } from "../composables/useRouteQueryString";
import { useRouteQueryNumber } from "../composables/useRouteQueryNumber";

const router = useRouter();

const page = useRouteQueryNumber("page", 1, { min: 1 });
const limit = useRouteQueryNumber("limit", 10, { min: 1, max: 50 });

const search = useRouteQueryString("q", "");

const q = useDebouncedRef(search, 350);

const {
  users,
  totalCount,
  totalPages,
  hasPrev,
  hasNext,
  loading,
  error,
  refetch,
} = useUserQuery(page, limit, q);

watch(limit, () => {
  page.value = 1;
});

watch(q, () => {
  page.value = 1;
});

function prev() {
  if (hasPrev.value) {
    page.value--;
  }
}

function next() {
  if (hasNext.value) {
    page.value++;
  }
}

function openUser(id: string) {
  router.push(`/users/${id}`);
}

function clearSearch() {
  search.value = "";
}
</script>
<style scoped>
.card {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  background: #fff;
}

p {
  margin: 0 0 14px;
  color: var(--text);
}

.box {
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--soft);
  margin-bottom: 16px;
}

.row {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 10px;
  padding: 8px 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

h2 {
  margin: 0 0 8px;
}

.mini {
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--soft);
}

.k {
  font-size: 12px;
  color: var(--muted);
}
.v {
  font-weight: 600;
}
.ok {
  color: #0b6b2f;
}
.error {
  color: #b42318;
}
.hint {
  margin-top: 6px;
  font-size: 12px;
  color: var(--muted);
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

.btn {
  margin-top: 10px;
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

.rowBtn {
  width: 100%;
  text-align: left;
  background: #fff;
  cursor: pointer;
  padding: 8px;
  border: 1px solid var(--border);
  margin: 4px 0;
}

.rowBtn:hover {
  background: #f9fafb;
}
</style>
