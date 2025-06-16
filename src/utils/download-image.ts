import { saveAs } from 'file-saver'

const downloadImage = async (id: string) => {
  try {
    const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

    const res = await fetch(`https://api.unsplash.com/photos/${id}/download`, {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    })

    const json = await res.json()
    const downloadUrl = json.url

    const imageRes = await fetch(downloadUrl)
    const blob = await imageRes.blob()

    saveAs(blob, `${id}.jpg`)
  } catch (err) {
    console.error('Ошибка при загрузке изображения:', err)
  }
}

export { downloadImage }
