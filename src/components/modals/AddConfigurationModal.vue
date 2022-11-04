<template>
  <div v-if="openModal" class="add-configuration-modal">
    <div class="modal fade show" role="dialog" style="display:block">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Configuration</h5>
            <button type="button" class="btn-close" @click="closeModal" />
          </div>
          <div class="modal-body">
            <form class="needs-validation" novalidate>
              <div class="mb-3">
                <label for="label" class="form-label pb-0">Label</label>
                <input type="text" class="form-control" id="label" v-model="form.label" >
                <div v-if="v$.form.label?.$error" class="invalid-feedback d-block mt-0">
                  {{ v$.form.label?.$errors[0].$message }}
                </div>
              </div>
              <div class="mb-3">
                <label for="field" class="form-label pb-0">field</label>
                <input type="text" class="form-control" id="field" v-model="form.field" >
                <div v-if="v$.form.field?.$error" class="invalid-feedback d-block mt-0">
                  {{ v$.form.label?.$errors[0].$message }}
                </div>
              </div>
              <div class="mb-3">
                <label for="placeholder" class="form-label pb-0">Placeholder</label>
                <input type="text" class="form-control" id="placeholder" v-model="form.placeholder" >
                <div v-if="v$.form.placeholder?.$error" class="invalid-feedback d-block mt-0">
                  {{ v$.form.placeholder?.$errors[0].$message }}
                </div>
              </div>
              <div class="mb-3">
                <label for="type" class="form-label pb-0">Type</label>
                <select class="form-select" id="type" v-model="form.type">
                  <option selected disabled>Type</option>
                  <option value="text">Text</option>
                  <option value="select">Select</option>
                  <option value="checkbox">Checkbox</option>
                </select>
                <div v-if="v$.form.type?.$error" class="invalid-feedback d-block mt-0">
                  {{ v$.form.type?.$errors[0].$message }}
                </div>
              </div>
              <div class="mb-3" v-if="form.type === 'select'">
                <label for="options" class="form-label pb-0">Options</label>
                <input type="text" class="form-control" id="options" placeholder="option1, option2, ...." v-model="form.options" >
                <div v-if="v$.form.options?.$error" class="invalid-feedback d-block mt-0">
                  {{ v$.form.options?.$errors[0].$message }}
                </div>
              </div>
              <div class="mb-3 form-check" v-if="form.type !== 'checkbox'">
                <input class="form-check-input" type="checkbox" v-model="form.required" id="required">
                <label class="form-check-label" for="required">Required</label>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
            <button type="button" class="btn btn-primary" @click="add">Add</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { required } from '@vuelidate/validators'
import { ConfigurationItem } from '@/interfaces'
import useVuelidate from '@vuelidate/core'
import useValidate from '@vuelidate/core'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AddConfigurationModal',
  props: {
    openModal: Boolean,
  },
  setup () {
    return {
      v$: useVuelidate(),
    }
  },
  data() {
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      v$: useValidate(),
      form: {} as ConfigurationItem
    }
  },
  validations() {
    return {
      form: {
        label: { required },
        type: { required },
        field: { required },
        options: this.form.type === 'select' ? { required } : {},
        placeholder: { required },
      }
    };
  },
  methods: {
    add() {
      this.v$.$validate()
      if (!this.v$.form.$error) {
        if (this.form.type === 'select') {
          this.form.options = this.form.options.split(',')
        }
        this.$emit('addConfiguration', this.form)
      }
    },
    closeModal() {
      this.$emit('closeModal')
    }
  }
});
</script>
