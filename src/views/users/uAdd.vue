<template>

  <div style="writing-mode: vertical-lr; width: 300px"> 
    
    <a-form  :form="form" @submit="handleSubmit">
    
      <!-- 删除标识 -->
      <!-- 用户名 -->
      <!-- 版本号 -->


      <!-- 上传头像 -->
      <div style="writing-mode: horizontal-tb;">
      <a-upload 
        name="avatar"
        list-type="picture-card"
        class="avatar-uploader"
        :show-upload-list="false"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        :before-upload="beforeUpload"
        @change="handleChange"
      >
        <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
        <div v-else style="text-align: -webkit-center;">
          <a-icon :type="loading ? 'loading' : 'plus'" />
          <div class="ant-upload-text" style="writing-mode: vertical-lr;text-align: center;">ᠰᠡᠭᠦᠳᠡᠷ ᠢᠡᠨ ᠳᠤᠰᠢᠶᠠᠬᠤ</div>
        </div>
      </a-upload>
      </div>

      <!-- 登录名 -->
      <a-form-item v-bind="formItemLayout" label="">
        <a-input
          placeholder="登录名"
          class="input-itm"
          v-decorator="[
            'loginname',
            {
              rules: [{ required: true, message: 'Please input your loginname number!' }],
            },
          ]"
        >
        </a-input>
      </a-form-item>

      <!-- 新蒙文名 -->
      <a-form-item v-bind="formItemLayout" label="">
        <a-input
          placeholder="新蒙文名"
          class="input-itm"
          v-decorator="[
            'namemn',
            {
              rules: [{ required: true, message: 'Please input your namemn number!' }],
            },
          ]"
        >
        </a-input>
      </a-form-item>

      <!-- 其他名 -->
      <a-form-item v-bind="formItemLayout" label="">
        <a-input
          placeholder="其他名"
          class="input-itm"
          v-decorator="[
            'nameother',
            {
              rules: [{ required: true, message: 'Please input your nameother number!' }],
            },
          ]"
        >
        </a-input>
      </a-form-item>

      <!-- 藏文名 -->
      <a-form-item v-bind="formItemLayout" label="">
        <a-input
          placeholder="藏文名"
          class="input-itm"
          v-decorator="[
            'namez',
            {
              rules: [{ required: true, message: 'Please input your namez number!' }],
            },
          ]"
        >
        </a-input>
      </a-form-item>

      <!-- 手机号 -->
      <a-form-item v-bind="formItemLayout" label="">
        <a-input
          placeholder="手机号"
          class="input-itm"
          v-decorator="[
            'phonenum',
            {
              rules: [{ required: true, message: 'Please input your phonenum number!' }],
            },
          ]"
        >
        </a-input>
      </a-form-item>

      <!-- 密码 -->
      <a-form-item v-bind="formItemLayout" label="" has-feedback>
        <a-input
          placeholder="密码"
          class="input-itm"
          v-decorator="[
            'password',
            {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: validateToNextPassword,
                },
              ],
            },
          ]"
          type="password"
        />
      </a-form-item>
      <!-- 验证密码 -->
      <a-form-item v-bind="formItemLayout" label="" has-feedback>
        <a-input
          placeholder="验证密码"
          class="input-itm"
          v-decorator="[
            'confirm',
            {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  validator: compareToFirstPassword,
                },
              ],
            },
          ]"
          type="password"
          @blur="handleConfirmBlur"
        />
      </a-form-item>

      <!-- 邮箱 -->
      <a-form-item v-bind="formItemLayout" label="">
        <a-input
          class="input-itm"
          placeholder="ᠢᠮᠧᠯ"
          v-decorator="[
            'email',
            {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <!-- 证件号 -->
      <a-form-item v-bind="formItemLayout" label="">
        <a-input
          placeholder="证件号"
          class="input-itm"
          v-decorator="[
            'identity',
            {
              rules: [{ required: true, message: 'Please input your identity number!' }],
            },
          ]"
        >
        </a-input>
      </a-form-item>

      <!-- 中文名 -->
      <a-form-item v-bind="formItemLayout" label="">
        <a-input
          placeholder="中文名"
          class="input-itm"
          v-decorator="[
            'namecn',
            {
              rules: [{ required: true, message: 'Please input your namecn number!' }],
            },
          ]"
        >
        </a-input>
      </a-form-item>
      <!-- 性别 -->
      <a-radio-group style="" name="radioGroup" :default-value="1">
        <a-radio style="margin: 60px 0px;font-size:20px" :value="1"> ᠡᠷᠡᠭᠲᠡᠢ </a-radio>
        <a-radio style="font-size:20px" :value="0"> ᠡᠮᠡᠭᠲᠡᠢ </a-radio>
      </a-radio-group>

      <!-- 提交按钮 -->
      <a-form-item v-bind="tailFormItemLayout" style="transform: rotate(90deg);" >
        <a-button style="font-size:20px" type="primary" html-type="submit"> ᠨᠡᠮᠡᠬᠦ </a-button>
      </a-form-item>
    </a-form>
    
  </div>
</template>

<script>
const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
]
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  data() {
    return {
      // 上传头像
      loading: false,
      imageUrl: '',

      confirmDirty: false,
      residences,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'register' })
  },
  methods: {
    // 上传头像--------------
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl
          this.loading = false
        })
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    },
    //---------------------
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    handleConfirmBlur(e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!')
      } else {
        callback()
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true })
      }
      callback()
    },
    handleWebsiteChange(value) {
      let autoCompleteResult
      if (!value) {
        autoCompleteResult = []
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map((domain) => `${value}${domain}`)
      }
      this.autoCompleteResult = autoCompleteResult
    },
  },
}
</script>

<style>
.input-itm {
  width: 32px;
  height: 100%;
  display: table-column;
  margin: 20px;
 
  
}

/* 上传头像 */
avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>