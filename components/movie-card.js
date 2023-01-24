import { image } from "@/libs/tmdb"
import styles from "@/styles/movie-card.module.css"
import Link from "next/link"

export default function MovieCard(props) {
    const { id, posterUrl, title } = props

    const imgStyle = {
        backgroundImage: 'url(' + image(posterUrl) + ')'
    }

    return (
        <Link href={"/movie/" + id}>
            <div className={styles.movieCard}>
                <div className={styles.img} style={imgStyle}></div>
                <div>
                    <p>{title}</p>
                </div>
            </div>
        </Link>
    )
}