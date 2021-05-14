<template>
  <page-header-wrapper>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-form :form="form">
        <a-form-item
          label="药品名称"
        >
          <a-input
            :maxLength="50"
            v-decorator="[
              'namecn',
              {rules: [{ required: true, message: 'error' }]}
            ]"
            placeholder="" />
        </a-form-item>
        <a-form-item
          label="别名"
        >
          <a-input
            :maxLength="50"
            v-decorator="[
              'name'
            ]"
            placeholder="" />
        </a-form-item>
        <a-form-item
          label="别名"
        >
          <a-checkbox-group>
          </a-checkbox-group>
        </a-form-item>
      </a-form>
    </a-card>
  </page-header-wrapper>
</template>

<script>

import {
  drugDetail
} from '@/api/drug'

export default {
  components: {
  },
  data() {
    return {
      form: this.$form.createForm(this),
      drugId: null,
      drug: {}
    };
  },
  created() {
    this.drugId = this.$route.params.id
    this.getDrug()
  },
  methods: {
    getDrug () {
    }
  }
}

</script>

<style lang="less" scoped>
</style>