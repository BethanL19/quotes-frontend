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
    votes: number;
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

    const handleVote = async (id: number) => {
        try {
            await axios.patch(props.backend + `/favourites/vote/${id}`);
            getFavs();
        } catch (error) {
            console.log(error);
        }
    };

    // show votes too but only on favs page
    const showFavs = favs.map((q) => (
        <>
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
            <button
                className="Votes"
                onClick={() => {
                    handleVote(q.quote_id);
                }}
            >
                {q.votes}
            </button>
        </>
    ));

    const handleBackToQuotes = () => {
        props.displayQuotesPage(true);
    };
    return (
        <>
            <button className="BackButton" onClick={handleBackToQuotes}>
                Back to Quotes
            </button>
            <div className="FavQuotes">{showFavs}</div>
        </>
    );
}
