<script setup>
import { onBeforeUnmount, ref, shallowRef, onMounted, watch, defineEmits } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { editorStore } from '../../store/index.js'

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
