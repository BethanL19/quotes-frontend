import axios from "axios";
import { useState } from "react";
import { SingleQuote } from "./SingleQuote";

interface FavProps {
    backend: string;
    displayQuotesPage: (display: boolean) => void;
}
interface FavQuote {
    id: number;
    quote_id: number;
    quote: string;
    author: string;
}
export function Favourites(props: FavProps): JSX.Element {
    const [favs, setFavs] = useState<FavQuote[]>([]);

    const getFavs = async () => {
        const response = await axios.get(props.backend + "/favourites");
        setFavs(response.data);
    };
    getFavs();

    const handleUnFav = async (id: number) => {
        try {
            await axios.delete(props.backend + `/favourites/${id}`);
            getFavs();
        } catch (error) {
            console.log(error);
        }
    };
    const showFavs = favs.map((q) => (
        <SingleQuote
            quote={q.quote}
            author={q.author}
            in_favourites={true}
            favOrUnFav={() => {
                handleUnFav(q.quote_id);
            }}
            key={q.id}
            id={q.id}
        />
    ));

    const handleBackToQuotes = () => {
        props.displayQuotesPage(true);
    };
    return (
        <>
            <button className="BackButton" onClick={handleBackToQuotes}>
                Back to Quotes
            </button>
            <div className="Quotes">{showFavs}</div>
        </>
    );
}
