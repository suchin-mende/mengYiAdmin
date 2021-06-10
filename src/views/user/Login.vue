<template>
  <div class="main">
    <a-form id="formLogin" class="user-layout-login" ref="formLogin" :form="form" @submit="handleSubmit">
      <a-alert
        v-if="isLoginError"
        type="error"
        showIcon
        style="margin-bottom: 24px"
        :message="$t('user.login.message-invalid-credentials')"
      />
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="ᠬᠡᠷᠡᠭᠯᠡᠭᠴᠢ ᠢᠨ ᠨᠡᠷ ᠡ ᠪᠡᠨ ᠤᠷᠤᠭᠤᠯᠤᠭᠠᠷᠠᠢ"
          v-decorator="[
            'loginname',
            {
              rules: [{ required: true, message: $t('ᠬᠡᠷᠡᠭᠯᠡᠭᠴᠢ ᠵᠢᠨ ᠨᠡᠷ᠎ᠡ ᠬᠤᠭᠤᠰᠤᠨ ᠪᠠᠢᠵᠤ ᠪᠤᠯᠬᠤ ᠦᠭᠡᠢ') }, { validator: handleUsernameOrEmail }],
              validateTrigger: 'change',
            },
          ]"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input-password
          size="large"
          placeholder="ᠨᠢᠭᠤᠴᠠ ᠨᠤᠮᠧᠷ ᠢᠡᠨ ᠤᠷᠤᠭᠤᠯᠤᠭᠠᠷᠠᠢ"
          v-decorator="[
            'password',
            { rules: [{ required: true, message: $t('ᠨᠢᠭᠤᠴᠠ ᠨᠤᠮᠧᠷ ᠬᠤᠭᠤᠰᠤᠨ ᠪᠠᠢᠵᠤ ᠪᠤᠯᠬᠤ ᠦᠭᠡᠢ') }], validateTrigger: 'blur' },
          ]"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input-password>
      </a-form-item>

      <a-row style="display: flex" :gutter="16">
        <a-col class="gutter-row" :span="16">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="ᠰᠢᠯᠭᠠᠬᠤ ᠺᠤᠳᠧ ᠵᠢ ᠤᠷᠤᠭᠤᠯᠤᠭᠠᠷᠠᠢ"
              v-decorator="[
                'imgcode',
                {
                  rules: [{ required: true, message: $t('ᠰᠢᠯᠭᠠᠬᠤ ᠺᠤᠲ ᠬᠤᠭᠤᠰᠤᠨ ᠪᠠᠢᠵᠤ ᠪᠤᠯᠬᠤ ᠦᠭᠡᠢ') }],
                  validateTrigger: 'blur',
                },
              ]"
            >
              <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
            <a-col class="gutter-row" :span="8">
              <img class="capacha" :src="captchaImage" @click="refreshCapache" />
            </a-col>
          </a-form-item>
        </a-col>

      </a-row>

      <a-form-item style="margin-top: 24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >{{ $t('ᠨᠡᠪᠲᠡᠷᠵᠤ ᠤᠷᠤᠬᠤ') }}</a-button
        >
      </a-form-item>
    </a-form>

    <two-step-captcha
      v-if="requiredTwoStepCaptcha"
      :visible="stepCaptchaVisible"
      @success="stepCaptchaSuccess"
      @cancel="stepCaptchaCancel"
    ></two-step-captcha>
  </div>
</template>

<script>
import md5 from 'md5'
import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
import { getSmsCaptcha, getCaptchaImage } from '@/api/login'

export default {
  components: {
    TwoStepCaptcha
  },
  data () {
    return {
      customActiveKey: 'tab1',
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      isLoginError: false,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      },
      captchaImage: null
    }
  },
  created () {
    this.refreshCapache()
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    refreshCapache () {
      getCaptchaImage().then((res) => {
        const src =
          'data:image/png;base64,' +
          btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), ''))
        this.captchaImage = src
      })
    },
    // handler
    handleUsernameOrEmail (rule, value, callback) {
      const { state } = this
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback()
    },
    handleTabClick (key) {
      this.customActiveKey = key
      // this.form.resetFields()
    },
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        customActiveKey,
        Login
      } = this

      state.loginBtn = true

      const validateFieldsKey =
        customActiveKey === 'tab1' ? ['loginname', 'password', 'imgcode'] : ['mobile', 'captcha']

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          console.log('login form', values)
          const loginParams = { ...values }
          delete loginParams.loginname
          loginParams[!state.loginType ? 'email' : 'loginname'] = values.loginname
          loginParams.password = md5(values.password)
          Login(loginParams)
            .then((res) => this.loginSuccess(res))
            .catch((err) => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },
    getCaptcha (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state
      } = this

      validateFields(['mobile'], { force: true }, (err, values) => {
        if (!err) {
          state.smsSendBtn = true

          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60
              state.smsSendBtn = false
              window.clearInterval(interval)
            }
          }, 1000)

          const hide = this.$message.loading('验证码发送中..', 0)
          getSmsCaptcha({ mobile: values.mobile })
            .then((res) => {
              setTimeout(hide, 2500)
              this.$notification['success']({
                message: '提示',
                description: '验证码获取成功，您的验证码为：' + res.result.captcha,
                duration: 8
              })
            })
            .catch((err) => {
              setTimeout(hide, 1)
              clearInterval(interval)
              state.time = 60
              state.smsSendBtn = false
              this.requestFailed(err)
            })
        }
      })
    },
    stepCaptchaSuccess () {
      this.loginSuccess()
    },
    stepCaptchaCancel () {
      this.Logout().then(() => {
        this.loginBtn = false
        this.stepCaptchaVisible = false
      })
    },
    loginSuccess (res) {
      console.log(res)
      // check res.homePage define, set $router.push name res.homePage
      // Why not enter onComplete
      /*
      this.$router.push({ name: 'analysis' }, () => {
        console.log('onComplete')
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      })
      */
      this.$router.push({ path: '/' })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: 'ᠪᠠᠶᠠᠷᠯᠠᠨ ᠤᠭᠳᠤᠶᠠ',
          description: `ᠲᠠᠨ ᠨᠤ ᠢᠷᠡᠬᠦ ᠵᠢ ᠪᠠᠶᠠᠷᠯᠠᠨ ᠤᠭᠳᠤᠵᠤ ᠪᠠᠢᠨᠠ`,
          style:"width: 170px;",
        })
      }, 1000)
      this.isLoginError = false
    },
    requestFailed (err) {
      this.isLoginError = true
      this.$notification['error']({
        message: 'ᠪᠤᠷᠤᠭᠤ',
        description: ((err.response || {}).data || {}).message || 'ᠪᠤᠷᠤᠭᠤ ᠭᠠᠷᠴᠠᠢ ᠂ ᠳᠠᠬᠢᠨ ᠲᠤᠷᠰᠢᠬᠤ ᠪᠤᠯᠪᠠᠦ',
        duration: 4
      })
    }
  }
}
</script>

<style lang="less" scoped>

.user-layout-login button.login-button{
  font-size: 2vh !important;
  padding: 20px 0px !important;
}

/deep/ .ant-form {
  display: grid !important;
  grid-auto-flow: column;
  grid-template-columns: repeat(4, 25%);

  .ant-form-explain {
    margin-top: 5px;
  }
  .capacha {
    position: absolute;
    top: 166px;
    transform: rotate(90deg);
    transform-origin: bottom left;
    height: 30px;
    margin-top: 10px;
  }

  #imgcode {
    height: 20vh;
  }
  .ant-row {
    margin: 0 18px 0 !important;
  }

  .ant-form-item-control.has-error {
    display: grid !important;
    grid-auto-flow: column;
  }

  .ant-input-affix-wrapper .ant-input-prefix {
    top: 10px;
    left: 9px;
  }
  .ant-input-affix-wrapper .ant-input-suffix {
    left: 35%;
    top: 93%;
  }
  input.ant-input {
    width: auto !important;
    font-size: 2vh;
    padding-top: 25px;
    padding-left: 0px;
    padding-right: 0px;
  }
}

.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    width: 4vh;
    height: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
  .capacha {
    width: 90px;
  }
}

@media screen and(-ms-high-contrast:active),(-ms-high-contrast:none){
	/*兼容IE11*/
  /deep/ .ant-form input.ant-input {
    writing-mode: tb-rl;
    width: 39px !important;
    text-align: left;
  }
  /deep/ .ant-form .login-button {
    width: 39px !important;
    height: 100px !important;
    
  }
  /deep/ .ant-form .ant-input-affix-wrapper .ant-input-prefix {
    top: 10px;
    left: 14px;
  }
  /deep/ .ant-form .ant-form-explain {
    position: absolute;
    top: 0px;
    left: 0px;

  }
}
</style>
