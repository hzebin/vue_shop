import Vue from 'vue'
import { Button, Form, Input, FormItem, Message } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$message = Message  //这个需要全局挂载到Vue上
