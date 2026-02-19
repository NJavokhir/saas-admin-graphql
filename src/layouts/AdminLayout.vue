<template>
    <div class="app">
        <aside class="sidebar">
            <div class="brand">
                <div class="logo">SA</div>
                <div class="brandText">
                    <div class="title">SaaS Admin</div>
                    <div class="subtitle">Vue 3 + GraphQL</div>
                </div>
            </div>

            <nav class="nav">
                <RouterLink to="/dashboard" class="navLink" active-class="active">Dashboard</RouterLink>
                <RouterLink to="/users" class="navLink" active-class="active">Users</RouterLink>
                <RouterLink to="/projects" class="navLink" active-class="active">Projects</RouterLink>
                <RouterLink to="/tasks" class="navLink" active-class="active">Tasks</RouterLink>
                <RouterLink to="/comments" class="navLink" active-class="active">Comments</RouterLink>
            </nav>

            <div class="sidebarFooter">
                <div class="pill">SaaS Admin</div>
                <div class="muted">GraphQL</div>
            </div>
        </aside>

        <main class="main">
            <header class="topbar">
                <div class="topbarLeft">
                    <div class="pageTitle">{{ pageTitle }}</div>
                    <div class="pageHint">Focus on GraphQL API</div>
                </div>
                <div class="topbarRight">
                    <span class="badge">Vue 3</span>
                    <span class="badge">TS</span>
                    <span class="badge">Router</span>
                </div>
            </header>
            <section class="content">
                <RouterView />
            </section>
        </main>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, RouterLink, RouterView } from 'vue-router';

const route = useRoute();

const pageTitle = computed(() => {
    const map: Record<string, string> = {
        '/dashboard': 'Dashboard',
        '/users': 'Users',
        '/projects': 'Projects',
        '/tasks': 'Tasks',
        '/comments': 'Comments',
    }
    return map[route.path] || 'Unknown';
})
</script>

<style scoped>
.app {
    display: grid;
    grid-template-columns: 260px 1fr;
    min-height: 100vh;
}

.sidebar {
    border-right: 1px solid var(--border);
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: #fff;
}

.barnd {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 10px;
    border: 1px solid var(--border);
    border-radius: 12px;
}

.logo {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: grid;
    place-items: center;
    background: #111;
    color: #fff;
    font-weight: 800;
}

.brandText .title {
    font-size: 12px;
    color: var(--muted);
}

.nav {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.navLink {
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid transparent;
    color: var(--text);
    text-decoration: none;
}

.navLink:hover {
    background: var(--soft);
    border-color: var(--border);
}

.navLink.active {
    background: #111;
    color: #fff;
}

.sidebarFooter {
    margin-top: auto;
    border-top: 1px solid var(--border);
    padding-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
}

.pill {
    width: fit-content;
    padding: 6px 10px;
    border-radius: 9999px;
    border: 1px solid var(--border);
    background: var(--soft);
    font-size: 12px;
}

.muted {
    font-size: 12px;
    color: var(--muted);
}

.main {
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.topbar {
    position: sticky;
    top: 0;
    z-index: 10;
    background: #fff;
    border-bottom: 1px solid var(--border);
    padding: 14px 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
}

.pageTitle {
    font-size: 12px;
    font-weight: 600;
    color: var(--muted);
}

.topbarRight {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.badge {
    font-size: 12px;
    padding: 6px 10px;
    border-radius: 9999px;
    border: 1px solid var(--border);
    background: var(--soft);
}

.content {
    padding: 18px;
    flex: 1;
    overflow: auto;
}
</style>