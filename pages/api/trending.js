import { getHighlights } from "@/libs/tmdb"

export default async (req, res) => {
    const results = await getHighlights()
    res.status(200).json({
        list: results
    })
} 