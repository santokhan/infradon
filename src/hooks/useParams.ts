import { ref, watch, watchEffect } from "vue"
import { useRoute } from "vue-router"

type Params = Record<string, string>

function useParams(): Params {
  const params = ref({})
  const route = useRoute()

  function assingParams() {
    const items = route.params
    const values: Params = {}

    for (const key in items) {
      const value = items[key]
      values[key] = Array.isArray(value) ? value[0] : value
    }

    params.value = values
  }

  watchEffect(assingParams)
  watch(() => route.params, assingParams)

  return params.value
}

export default useParams