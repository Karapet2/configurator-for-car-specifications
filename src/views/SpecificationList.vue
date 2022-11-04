<template>
  <div class="specification-list card m-5 p-2">
    <h1 class="text-center">Specification List</h1>
    <div v-if="specificationList.length" class="accordion" id="specification-list">
      <div class="accordion-item" v-for="specification in specificationList" :key="specification.id">
        <router-link :to="{ name: 'edit', params: { id: specification.id }}">
          <button type="button" class="btn btn-secondary m-1">Edit</button>
        </router-link>
        <h2 class="accordion-header" :id="`header-${specification.id}`">
          <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="`#collapse-${specification.id}`"
              :aria-controls="`collapse-${specification.id}`"
          >
            {{ specification.name }}
          </button>
        </h2>
        <div
            :id="`collapse-${specification.id}`"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
            :aria-labelledby="`heading-${specification.id}`"
        >
          <div class="accordion-body">
            <div v-for="key in Object.keys(specification)" :key="key">
              <span v-if="key !== 'id'">{{ key }} - {{ specification[key] }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center mt-5 pb-5" v-else>No specifications yet!</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { SpecificationItem } from '@/interfaces'
import { specificationList } from '@/constants'

@Options({
  data() {
    return {
      specificationList: [] as SpecificationItem[],
    }
  },
  mounted() {
    const list = window.localStorage.getItem('specificationList')
    if (list) {
      this.specificationList = JSON.parse(list)
    } else {
      this.specificationList = specificationList
      window.localStorage.setItem('specificationList', JSON.stringify(specificationList))
    }
  },
})

export default class ManageSpecification extends Vue {}
</script>
