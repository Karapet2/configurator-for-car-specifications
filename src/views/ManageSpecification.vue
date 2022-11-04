<template>
  <div class="card text-start m-5 p-2">
    <h1 class="text-center">{{ this.form.id ? 'Edit' : 'Create' }} Specification</h1>
    <div class="card-body">
      <form class="needs-validation" novalidate>
        <div v-for="item in configurationItems" :key="item.field" class="row d-flex justify-content-center">
        <div class="mb-3 col-4" v-if="item.type === 'text'">
          <label :for="item.field" class="form-label pb-0">{{ item.label }}</label>
          <input :type="item.type" class="form-control" :id="item.field" v-model="form[item.field]" :placeholder="item.placeholder">
          <div v-if="v$.form[item.field]?.$error" class="invalid-feedback d-block mt-0">
            {{ v$.form[item?.field]?.$errors[0].$message }}
          </div>
        </div>
        <div class="mb-3 col-4" v-else-if="item.type === 'select'">
          <label :for="item.field" class="form-label pb-0">{{ item.label }}</label>
          <select class="form-select" v-model="form[item.field]">
            <option value="" selected disabled>{{ item.placeholder }}</option>
            <option v-for="option in item.options" :key="option.value" :value="option">{{ option }}</option>
          </select>
          <div v-if="v$.form[item.field]?.$error" class="invalid-feedback d-block mt-0">
            {{ v$.form[item?.field]?.$errors[0].$message }}
          </div>
        </div>
        <div class="mb-3 col-4 form-check" v-else-if="item.type === 'checkbox'">
          <input class="form-check-input" type="checkbox" v-model="form[item.field]" :id="item.field">
          <label class="form-check-label" :for="item.field">
            {{ item.label }}
          </label>
          <div v-if="v$.form[item.field]?.$error" class="invalid-feedback d-block mt-0">
            {{ v$.form[item?.field]?.$errors[0].$message }}
          </div>
        </div>
      </div>
        <div class="row d-flex justify-content-center">
          <div class="card-footer col-4 text-end d-flex justify-content-between">
            <button type="button" class="btn btn-primary" @click="openModal = true">
              New configuration
            </button>
            <button type="button" @click="submit" class="btn btn-primary">
              {{ this.form.id ? 'Update' : 'Create' }}
            </button>
          </div>
        </div>
      </form>
    </div>
    <add-configuration-modal
        :openModal="openModal"
        @addConfiguration="addConfiguration"
        @closeModal="closeModal"
    />
  </div>
</template>

<script lang="ts">
import { ConfigurationItem, SpecificationItem, SpecificationValidation } from '@/interfaces'
import AddConfigurationModal from '@/components/modals/AddConfigurationModal.vue'
import { configurationFields } from '@/constants'
import { Options, Vue } from 'vue-class-component'
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import useValidate from '@vuelidate/core'
import { useRoute } from 'vue-router'
import router from '@/router'

@Options({
  components: {
    AddConfigurationModal
  },
  setup () {
    return { v$: useVuelidate() }
  },
  watch: {
    $route() {
      this.form = {} as SpecificationItem
    }
  },
  data() {
    return {
      v$: useValidate(),
      openModal: false,
      specificationList: [] as SpecificationItem[],
      configurationItems: configurationFields as ConfigurationItem[],
      form: {} as SpecificationItem
    }
  },
  mounted() {
    const route = useRoute()
    const specificationId = +route.params.id
    const list = window.localStorage.getItem('specificationList')
    if (list) {
      this.specificationList = JSON.parse(list)
    }
    if (specificationId) {
      const editItem = this.specificationList.find((item: SpecificationItem) => (item.id === specificationId))
      if (!editItem) {
        router.push({ name: 'list' })
      } else {
        this.form = editItem;
      }
    }

    const configurations = window.localStorage.getItem('configurationItems')
    if (configurations) {
      this.configurationItems = JSON.parse(configurations)
    } else {
      window.localStorage.setItem('configurationItems', JSON.stringify(this.configurationItems))
    }
  },
  validations() {
    const validators = this.configurationItems.reduce(
      (acc: SpecificationValidation, current: SpecificationItem) => ({
          ...acc,
          [current.field]: current.required ? { required } : {}
        }
      ),
      {}
    )
    return { form: validators };
  },
  methods: {
    submit() {
      this.v$.$validate();
      if (!this.v$.form.$error) {
        if (this.form.id) {
          this.specificationList = this.specificationList.map((item: SpecificationItem) => {
            if (item.id === this.form.id) {
              item = this.form
            }
            return item
          })
        } else {
          this.specificationList.push({ id: Math.ceil(Math.random() * 10000 * 10000), ...this.form })
        }
        window.localStorage.setItem('specificationList', JSON.stringify(this.specificationList))
        router.push({ name: 'list' })
      }
    },
    addConfiguration(configuration: ConfigurationItem) {
      this.configurationItems.push(configuration)
      window.localStorage.setItem('configurationItems', JSON.stringify(this.configurationItems))
      this.closeModal()
    },
    closeModal() {
      this.openModal = false
    }
  }
})

export default class SpecificationCreate extends Vue {}
</script>
