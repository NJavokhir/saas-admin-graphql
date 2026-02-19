<template>
  <div class="card">
    <h2>Welcome to the Dashboard</h2>
    <p>Here you can find an overview of your application.</p>

    <div class="grid">
      <div class="mini">
        <div class="k">Goal</div>
        <div class="v">GraphQL</div>
      </div>
      <div class="mini">
        <div class="k">UI</div>
        <div class="v">Focus on Logic</div>
      </div>
      <div>
        <div>Next Steps</div>
        <div>Implement Authentication</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  background: #fff;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

h2 {
  margin: 0 0 8px;
}
p {
  margin: 0 0 14px;
  color: var(--text);
}

.mini {
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--soft);
}

.k {
  font-size: 12px;
  font-weight: 600;
  color: var(--muted);
}

.v {
  font-weight: 400;
  color: var(--text);
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
