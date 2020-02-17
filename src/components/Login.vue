<template>
  <!--登录组件  -->
  <div class="login_container">
    <div class="login_box">
      <!--头像区域-->
      <div class="avatar_box">
        <img src="~assets/logo.png" alt="">
      </div>
      <!--登录表单区域-->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!--用户名-->
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input type="password" prefix-icon="el-icon-lock" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="loginBtn">登录</el-button>
          <el-button type="info" @click="resetBtn">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        loginForm: {
          username: 'admin',
          password: '123456'
        },
        // 表单验证
        loginFormRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入登录密码', trigger: 'blur' },
            { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      resetBtn() {
        //重置按钮
        // console.log(this);
        this.$refs.loginFormRef.resetFields();
      },
      loginBtn() {
        //提交表单时对表单的预验证
        this.$refs.loginFormRef.validate(async valid => {
          if (!valid) {
            return;
          }
          // console.log(valid);预验证
          //如果是范围promise数据，用await可以简化【await用在async的方法中】
          // const res = await this.$http.post("/login", this.loginForm);
          const {data: res} = await this.$http.post("/login", this.loginForm);
          //上面是解构
          console.log(res);
          if (res.meta.status == 200) {
            // console.log("登录成功");
            this.$message.success("登录成功");

            //保存token
            window.sessionStorage.setItem("token", res.data.token);
            //路由跳转
            this.$router.push("/home");
          } else {
            // console.log("登录失败");
            this.$message.error("登录失败");
          }
        })
      }
    }
  }
</script>

<style scoped>
  .login_container {
    background-color: #2b4b6b;
    height: 100%;  /*查看global设置了100%样式，而且login_container外面没有嵌套div*/
  }

  .login_box {
    height: 300px;
    width: 450px;
    border-radius: 5px;
    background-color: white;
    position: absolute;  /*绝对定位，这样才能位移*/
    left: 50%;
    top: 50%;  /*移动的是相对于div的左上角位置的，需要考虑自身的宽度*/
    transform: translate(-50%, -50%);  /*考虑自动宽度的位移*/
  }

  .avatar_box {
    height: 160px;
    width: 160px;
    border-radius: 50%;
    border: 1px solid #eee;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
  }

  .avatar_box img {
    height: 160px;
    width: 160px;
    border-radius: 50%;
    background-color: #eee;
  }

  .login_form {
    position: absolute;
    bottom: 0px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .btns {
    display: flex;
    justify-content: center;
  }
</style>