<template>
  <div class="login_bg">
    登录页面
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
  data() {
    return {
      form: {
        name: '',
        pwd: '',
        yzm: ''
      },
      flag: true,
      errorTitle: ''
    }
  },
  methods: {
    onSubmit() {
      const vm = this
      if (vm.form.name === '' || vm.form.pwd === '') {
        vm.errorTitle = '账号或密码不能为空！'
        vm.flag = false
        return
      }
      this.flag = true
      var formData = qs.stringify({
        UserName: vm.form.name,
        Password: vm.form.pwd
      })
      vm.$http.post(this.$service.login,formData).then(data => {
        if (data.Status == 0) {
          sessionStorage.setItem('userInfo',JSON.stringify(data.Data))
          sessionStorage.setItem('UserID', data.Data.UserID)
          var json = qs.stringify({
            CallType: '',
            UserID: data.Data.UserID
          })
          vm.$http.post(this.$service.getMesMenu,json).then(res => {
            if (res.Status == 0) {
              sessionStorage.setItem('menu',JSON.stringify(res.Data))
              var url = vm.$route.query.redirect
              console.log(url)
              if(url){
                vm.$router.push(url)
                // this.$router.go(-1)
              }else{
                vm.$router.push('/orderCenter/default')
              }
            }
          })
        } else {
          vm.errorTitle = data.Message
          vm.flag = false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  
</style>
