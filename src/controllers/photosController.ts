import { api } from '@/api/unsplash'
import type { Basic, Full, Random } from 'unsplash-js/dist/methods/photos/types'

interface ParamsSearchPhotos {
  query: string
  page: number
  perPage: number
  orientation?: 'landscape' | 'portrait' | 'squarish'
}

export const photosController = {
  async searchPhotos(params: ParamsSearchPhotos): Promise<Basic[]> {
    const { query, page, perPage, orientation = 'landscape' } = params
    try {
      const res = await api.search.getPhotos({
        query,
        page,
        perPage,
        orientation,
      })

      if (res.type !== 'success' || !res.response) {
        throw new Error('Ошибка при запросе')
      }

      return res.response.results
    } catch (e) {
      throw new Error('Ошибка при запросе')
    }
  },

  async getRandomPhotos(count: number = 8): Promise<Random[]> {
    try {
      const res = await api.photos.getRandom({ count, orientation: 'landscape' })

      if (res.type !== 'success' || !res.response) {
        throw new Error('Ошибка при запросе')
      }

      return Array.isArray(res.response) ? res.response : [res.response]
    } catch (e) {
      throw new Error('Ошибка при запросе')
    }
  },

  async getPhotoById(photoId: string): Promise<Full> {
    try {
      const res = await api.photos.get({ photoId })

      if (res.type !== 'success' || !res.response) {
        throw new Error('Ошибка при запросе')
      }

      return res.response
    } catch (e) {
      throw new Error('Ошибка при запросе')
    }
  },

  async getMultiplePhotosByIds(ids: string[]): Promise<Full[]> {
    try {
      const res = await Promise.all(ids.map((id) => photosController.getPhotoById(id)))

      return res
    } catch (e) {
      throw new Error('Ошибка при запросе')
    }
  },
}
