<template>
  <page-header-wrapper>
    <template v-slot:content>
      <a-descriptions :column="1">
        <a-descriptions-item label="别名">{{ drug.namem }}</a-descriptions-item>
        <a-descriptions-item label="来源">{{ drug.source }}</a-descriptions-item>
        <a-descriptions-item label="五元">{{ drug.five }}</a-descriptions-item>
        <a-descriptions-item label="六味">{{ drug.sixTaste }}</a-descriptions-item>
        <a-descriptions-item label="药性">{{ drug.drugProperty }}</a-descriptions-item>
        <a-descriptions-item label="药力">{{ drug.drugPower }}</a-descriptions-item>
        <a-descriptions-item label="分解药味">{{ drug.decomposedTaste }}</a-descriptions-item>
        <a-descriptions-item label="十七功效">{{ drug.seventeenEffect }}</a-descriptions-item>
        <a-descriptions-item label="分解功效">{{ drug.decomEffect }}</a-descriptions-item>
        <a-descriptions-item label="本质功效">{{ drug.baseEffect }}</a-descriptions-item>
        <a-descriptions-item label="主治疾病">{{ drug.baseFix }}</a-descriptions-item>
        <a-descriptions-item label="功效类别">{{ drug.effectCat }}</a-descriptions-item>
        <a-descriptions-item label="作用方式">{{ drug.actionMode }}</a-descriptions-item>
        <a-descriptions-item>
          <a-button type="primary">修改</a-button>
        </a-descriptions-item>
      </a-descriptions>
    </template>
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
      drugDetail({
        beanId: this.drugId
      })
        .then(res => {
          const { data } = res
          const drug = {
            namem: data.drug.namem,
            source: data.drugSource.filter(d => d.checkflag === '1').map(d => d.namem).join(', '),
            five: data.fiveElement.filter(d => d.checkflag === '1').map(d => d.namem).join(', '),
            sixTaste: data.sixTaste.filter(d => d.checkflag === '1').map(d => d.namem).join(', '),
            drugProperty: data.drugProperty.filter(d => d.checkflag === '1').map(d => d.namem).join(', '),
            drugPower: data.drugPower.filter(d => d.checkflag === '1').map(d => d.namem).join(', '),
            decomposedTaste: data.decomposedTaste.filter(d => d.checkflag === '1').map(d => d.namem).join(', '),
            seventeenEffect: data.seventeenEffect.filter(d => d.checkflag === '1').map(d => d.namem).join(', '),
            decomEffect: data.drug.decomEffect,
            baseEffect: data.drug.baseEffect,
            baseFix: data.drug.baseFix,
            effectCat: data.effectCat.filter(d => d.checkflag === '1').map(d => d.namem).join(', '),
            actionMode: data.actionMode.filter(d => d.checkflag === '1').map(d => d.namem).join(', '),
          }
          this.drug = drug
        })
    }
  }
}

</script>

<style lang="less" scoped>
/deep/ .ant-pro-page-header-wrap-page-header-warp {
  width: 100%;
  .ant-descriptions-row {
    padding: 0 10px;
    display: block;

  .ant-descriptions-item-content {
      margin-top: 30px;
    }
  }
  .ant-descriptions-row {
    &:last-child {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>