import { createApi } from 'unsplash-js'

const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

const api = createApi({
  accessKey: accessKey,
})

export { api }
