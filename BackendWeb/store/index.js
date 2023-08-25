import { defineStore } from 'pinia'

export const editorStore = defineStore('editor', {
  state: () => ({ val:'' }),
  actions: {
    setVal(val) {
      this.val = val
    }
  },
})