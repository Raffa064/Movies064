import { image } from "@/libs/tmdb"
import styles from '@/styles/movie.module.css'
import styles2 from '@/styles/home.module.css'
import classNames from "classnames"
import { useRouter } from "next/router"
import NumberSuffix from 'number-suffix'

const HOST = 'http://localhost:3000'

export default function Movie({ data }) {
    const { poster_path, title, genres, runtime, budget, status, release_date, vote_count, vote_average, overview } = data
    const rateColor = vote_average < 4 ? "#ee3242" : vote_average < 7 ? "#fa0" : "#00ee66";
    const router = useRouter()
    const number = (value) => {
        return value < 1000? value : NumberSuffix.format(value)
    }
    return (
        <main className={classNames(styles.main, styles.horizontal)}>
            <div className={styles.poster} style={{ backgroundImage: 'url(' + image(poster_path) + ')' }} />
            <div>
                <p className={styles.rate} style={{ color: rateColor, borderColor: rateColor }}>{parseInt(vote_average)}/<strong>10</strong></p>
                <h1>{title}</h1>
                <p>{genres.map(item => (<span className={styles.genre}>{item.name + ' '}</span>))}</p>
                <p><strong>Duração:</strong> {runtime}min</p>
                <p><strong>Orçamento:</strong> {number(budget)} USD</p>
                <p><strong>Status:</strong> {status}</p>
                <p><strong>Data de lançamento:</strong> {release_date} USD</p>
                <p><strong>Avaliações:</strong> {number(vote_count)}</p>
                <div className={styles2.labeledContainer}>
                    <span id={styles.overviewTitle} className={styles2.label}>Visão geral</span>
                    <p>{overview}</p>
                </div>
                <span className={styles.goBack} onClick={() => router.back()}>Voltar para o inicio</span>
            </div>
        </main>
    )
}

export async function getServerSideProps(context) {
    const res = await fetch(HOST + '/api/movie/' + context.params.id)
    const { data } = await res.json()
    return {
        props: {
            data
        }
    }
}
