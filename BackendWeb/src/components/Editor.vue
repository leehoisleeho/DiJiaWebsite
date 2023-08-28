<script setup>
import { onBeforeUnmount, ref, shallowRef, onMounted, watch  } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { editorStore } from '../../store/index.js'
const BaseUrl = 'http://127.0.0.1:7001'
const props = defineProps({
  editor: {
    type: String
  }
})

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef()

// 内容 HTML
const editorstor = editorStore()
const valueHtml = ref(editorstor.val)

// 监听内容变化
watch(valueHtml, (val) => {
  editorstor.setVal(val)
})

// 编辑器配置
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: { /* 菜单配置，下文解释 */ }
}
editorConfig.MENU_CONF['lineHeight'] = {
  lineHeightList: ['1', '1.5', '2', '2.5','3.5']
}

/**
 * 编辑器图片上传的方法
 * server 上传的接口地址
 * insertFn 插入图片的方法，可自定义
 */
// 图片上传地址配置
editorConfig.MENU_CONF['uploadImage'] = {
  server: BaseUrl + '/api/updataImg',
  customInsert(res, insertFn) {
    let url = BaseUrl + res.data.url
    insertFn(url)
  },
}



const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

// 组件销毁时，及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
</script>

<template>
  <div style="border: 1px solid #ccc">
    <!-- 工具栏 -->
    <Toolbar :editor="editorRef" style="border-bottom: 1px solid #ccc" />
    <!-- 编辑器 -->
    <Editor v-model="valueHtml" :defaultConfig="editorConfig" style="height: 600px; overflow-y: hidden;"
      @onCreated="handleCreated" />
  </div>
</template>

<!-- 别忘了引入样式 -->
<style src="@wangeditor/editor/dist/css/style.css"></style>
