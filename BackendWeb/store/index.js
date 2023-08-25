import { defineStore } from 'pinia'

export const editorStore = defineStore('counter', {
  state: () => ({ val:'' }),
  actions: {
    setVal(val) {
      this.val = val
    }
  },
})