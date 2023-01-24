import { searchMovie } from "@/libs/tmdb"

export default async (req, res) => {
    const results = await searchMovie(req.query.q)
    res.status(200).json({
        list: results
    })
} 