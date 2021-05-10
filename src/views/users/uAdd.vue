<template>
  <page-header-wrapper>
    <a-form :form="form">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label=" ᠨᠡᠷ᠎ᠡ"
      >
        <a-input
          v-decorator="[
            'username',
            { rules: [{ required: true, message: 'Please input your name' }] },
          ]"
          placeholder="Please input your name"
        />
      </a-form-item>

      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label=" ᠨᠢᠭᠤᠴᠠ ᠳ᠋ᠤᠭᠠᠷ"
      >

        <a-input-password
          v-decorator="[
            'pwd',
            { rules: [{ required: true, message: 'Please input your name' }] },
          ]"
          placeholder="Please input your name"
        />
      </a-form-item>

      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label=" ᠤᠲᠠᠰᠤᠨ ᠳ᠋ᠤᠭᠠᠷ"
      >
        <a-input
          v-decorator="[
            'phonenum',
            { rules: [{ required: true, message: 'Please input your name' }] },
          ]"
          placeholder="Please input your name"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label=" ᠦᠨᠡᠮᠯᠡᠯ ᠦᠨ ᠳ᠋ᠤᠭᠠᠷ"
      >
        <a-input
          v-decorator="[
            'identity',
            { rules: [{ required: true, message: 'Please input your name' }] },
          ]"
          placeholder="Please input your name"
        />
      </a-form-item>

      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label=" ᠢᠮᠸᠯ"
      >
        <a-input
          v-decorator="[
            'email',
            { rules: [{ required: true, message: 'Please input your name' }] },
          ]"
          placeholder="Please input your name"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label=" ᠬᠦᠢᠰᠦ"
        >
        <a-radio-group>
          <a-radio :value="1">
            ᠡᠷᠡᠭᠲᠡᠢ
          </a-radio>
          <a-radio :value="2">
            ᠡᠮᠡᠭᠲᠡᠢ
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="Nickname"
      >
        <a-input
          v-decorator="[
            'nickname',
            { rules: [{ required: checkNick, message: 'Please input your nickname' }] },
          ]"
          placeholder="Please input your nickname"
        />
      </a-form-item>
      <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol">
        <a-checkbox :checked="checkNick" @change="handleChange">
          Nickname is required
        </a-checkbox>
      </a-form-item>
      <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol">
        <a-button type="primary" @click="check">
          ᠨᠡᠮᠡᠬᠦ
        </a-button>

        <a-button type="plain" @click="handleBack">
          ᠪᠤᠴᠠᠬᠤ
        </a-button>
      </a-form-item>
    </a-form>

  </page-header-wrapper>
</template>

<script>
  import {uSave} from '@/api/accounts'


  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
  };
  const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
  };
  export default {
    data() {
      return {
        checkNick: false,
        formItemLayout,
        formTailLayout,
        form: this.$form.createForm(this, { name: 'dynamic_rule' }),
      };
    },
    methods: {
      check() {
        this.form.validateFields(err => {
          if (!err) {
            console.info('success');
          }
        });
      },
      handleChange(e) {
        this.checkNick = e.target.checked;
        this.$nextTick(() => {
          this.form.validateFields(['nickname'], { force: true });
        });
      },

      handleBack() {
      this.$store.dispatch('tagsView/delView', this.$route)
      this.$router.go(-1)
    }
    },
  };
  </script>
  

<style lang="less" scoped>
  .ant-pro-basicLayout-content .ant-pro-page-header-wrap {
    display: flex;
  }

  .ant-page-header {
    padding: 10px;
  }

  .ant-card-head {
    padding: 0;
    margin-bottom: 0;
  }

  .ant-card-extra {
    float: unset;
    margin-left: unset;
    writing-mode: vertical-lr;
  }

  .ant-card {
    display: flex;
  }

  .ant-radio-button-wrapper {
    height: unset;
  }

  .ant-list-split .ant-list-item {
    border-bottom: unset;
    border-right: 1px solid #e8e8e8;
  }

  .ant-list {
    display: flex;
  }

  .ant-list-pagination {
    writing-mode: vertical-lr;

  }

  .ant-avatar-lg {
    width: 48px;
    height: 48px;
    line-height: 48px;
  }

  .list-content-item {
    color: rgba(0, 0, 0, 0.45);
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    margin-left: 40px;

    span {
      line-height: 20px
    }

    p {
      margin-top: 4px;
      margin-bottom: 0;
      line-height: 22px;
    }
  }
</style>