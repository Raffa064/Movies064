export const API_KEY = process.env.API_KEY 
export const BASE = 'https://api.themoviedb.org/3'

export function image(url) {
    return 'https://image.tmdb.org/t/p/original'+url
}

export async function getHighlights() {
    const res = await fetch(BASE+'/trending/movie/week?api_key='+API_KEY+'&language=pt-BR')
    const data = await res.json()
    return data.results
}

export async function searchMovie(searchText) {
    const res = await fetch(BASE+'/search/movie?api_key='+API_KEY+'&query='+searchText+'&language=pt-BR')
    const data = await res.json()
    return data.results || []
}

export async function movie(id) {
    const res = await fetch(BASE+'/movie/'+id+'?api_key='+API_KEY+'&language=pt-BR')
    const data = await res.json()
    return data
}