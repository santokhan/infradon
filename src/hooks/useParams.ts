import { useRoute } from "vue-router"
import type { RouteParamsGeneric  } from "vue-router"

function useParams(): RouteParamsGeneric {
  const route = useRoute()

  return route.params
}

export default useParams