<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid justify-content-start">
      <router-link to="/" class="m-1">
        <button type="button" class="btn btn-light">List</button>
      </router-link>
      <router-link to="/create">
        <button type="button" class="btn btn-light">Create new</button>
      </router-link>
    </div>
  </nav>
  <router-view />
</template>

<style>
  .active-link button {
    font-weight: bold;
    border: 1px solid #4d4c4c
  }
</style>
