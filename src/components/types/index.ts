export interface Location {
  id: number
  name: string
  type: string
  dimension: string
  residents: Character[]
  url: Location
  created: string
}

export interface Origin {
  name: string
  url: Location
}

export interface Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: Origin
  location: Origin
  image: string
  episode: string[]
  url: string
  created: string
}
export interface Episode {
  id: number
  name: string
  air_date: string
  episode: string
  characters: Character[]
}

export type SelectCharacter = Character | undefined
