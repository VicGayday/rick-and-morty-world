import axios from "axios"

export async function fetchAllPages() {
  const characters = []
  let url = "https://rickandmortyapi.com/api/character"

  try {
    while (url) {
      const response = await axios.get(url)
      const data = response.data
      characters.push(...data.results)
      url = data.info.next
    }

    return characters
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error)
    throw error
  }
}
