import { movie } from "@/libs/tmdb"

export default async (req, res) => {
    const data = await movie(req.query.id)
    res.status(200).json({
        data: data
    })
} 