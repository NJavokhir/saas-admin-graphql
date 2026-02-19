<template>
  <div class="card">
    <h2>Welcome to the Dashboard</h2>
    <p>Here you can find an overview of your application.</p>

    <div class="box">
        <div class="row">
            <span class="k">Status</span>
            <span class="v" v-if="loading">Loading...</span>
            <span class="v" v-else-if="error">Error: {{ error.message }}</span>
            <span class="v" v-else>{{ data?.user?.status }}</span>
        </div>
        
        <div v-if="data?.user" class="row">
            <span class="k">Sample User</span>
            <span class="v">{{ data.user.id }} - {{ data.user.name }} - {{ data.user.username }}</span>
        </div>

        <div class="hint">This is a sample user fetched from the GraphQL API.</div>
    </div>


    <div class="grid">
      <div class="mini">
        <div class="k">Client</div>
        <div class="v">Apollo Client</div>
      </div>
      <div class="mini">
        <div class="k">Endpoint</div>
        <div class="v">https://graphqlzero.almansi.me/api</div>
      </div>
      <div class="mini">
        <div class="k">Approach</div>
        <div class="v">Querying with Apollo Client</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'

const GET_SAMPLE_USER = gql`
  query GetSampleUser($id: ID!) {
    user(id: $id) {
      id
      name
      username
    }
  }
`

const { result: data, loading, error } = useQuery(GET_SAMPLE_USER, { id: '1' })
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
</style>
