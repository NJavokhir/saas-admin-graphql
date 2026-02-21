<template>
  <div class="wrap">
    <div class="header">
      <div>
        <h2>User Details</h2>
        <p class="muted">Route param -> GraphQL variables -> query by ID</p>
      </div>

      <button class="btn" @click="goBack()" type="button"><-Back</button>
    </div>
    <QueryState
      :loading="loading"
      :error="error"
      :isEmpty="!user"
      @retry="refetch()"
    >
      <div class="card">
        <div class="row">
          <span class="k">ID</span>
          <span class="v mono">#{{ user?.id }}</span>
        </div>

        <div class="row">
          <span class="k">Name</span>
          <span class="v strong">{{ user?.name }}</span>
        </div>

        <div class="row">
          <span class="k">Username</span>
          <span class="v muted">@{{ user?.username }}</span>
        </div>

        <div class="divider"></div>

        <div class="row">
          <span class="k">Email</span>
          <span class="v">{{ user?.email || "—" }}</span>
        </div>

        <div class="row">
          <span class="k">Phone</span>
          <span class="v">{{ user?.phone || "—" }}</span>
        </div>

        <div class="row">
          <span class="k">Website</span>
          <span class="v">{{ user?.website || "—" }}</span>
        </div>
      </div>
    </QueryState>
  </div>
</template>
<script setup lang="ts">
import QueryState from "../components/QueryState.vue";
import { useUserByIdQuery } from "../composables/users/useUserByIdQuery";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const userId = computed(() => {
  const v = route.params.id;
  return typeof v === "string" ? v : "";
});

const { user, loading, error, refetch } = useUserByIdQuery(userId);

function goBack() {
  router.push("/user");
}
</script>
<style scoped>
.wrap {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 12px;
}

h2{
    margin: 0 0 4px;
}

.muted {
    color: var(--muted);
    margin: 0;
    font-size: 12px;
}

.card {
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 12px;
    background: #fff;
}

.row {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 10px;
    padding: 8px 0;
}
</style>