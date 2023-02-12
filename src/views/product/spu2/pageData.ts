import { ref } from 'vue'
// 复用分页器数据的
export function usePageData() {
  const total = ref(0)
  const current = ref(1)
  const sizes = ref(5)



  return {
    total,
    current,
    sizes
  }
}
