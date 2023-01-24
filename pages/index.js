import MovieCard from "@/components/movie-card"
import { getHighlights, searchMovie } from "@/libs/tmdb"
import Head from "next/head"
import { useState } from "react"
import styles from "../styles/home.module.css"
import classNames from 'classnames'


const HOST = 'http://127.0.0.1:3000'

export default function Home({ highlights }) {
    const [searchText, setSearchText] = useState('')
    const [searchList, setSearchList] = useState([])

    const handleSearch = async (search) => {
        setSearchText(search)

        const res = await fetch(HOST+'/api/search?q=' + search)
        const { list } = await res.json()
        setSearchList(list)
    }

    const searchResults = () => {
        if (searchList.length > 0) {
            return searchList.map(item => (
                <MovieCard id={item.id} posterUrl={item.poster_path} title={item.title}></MovieCard>
            ))
        }

        return (
            <p>Invalid search</p>
        )
    }

    return (
        <>
            <Head>
                <title>Movies064</title>
                <link rel="icon" href="/favicon.ico"></link>
            </Head>
            <main className={styles.main}>
                <h1>Movies<span>064</span></h1>
                <input placeholder="Search..." value={searchText} onChange={e => handleSearch(e.target.value)} />
                <div className={styles.labeledContainer}>
                    <span className={styles.label}>Search</span>
                    <div>
                        {
                            searchResults()
                        }
                    </div>
                </div>
                <div className={styles.labeledContainer}>
                    <span className={styles.label}>Highlights</span>
                    <div>
                        {
                            highlights.map(item => (
                                <MovieCard id={item.id} posterUrl={item.poster_path} title={item.title}></MovieCard>
                            ))
                        }
                    </div>
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps() {
    const res = await fetch(HOST+'/api/trending')
    const { list } = await res.json()
    return {
        props: {
            highlights: list
        }
    }
}