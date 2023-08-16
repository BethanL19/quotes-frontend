import { useState } from "react";
import axios from "axios";
import { SingleQuote } from "./SingleQuote";

export interface Quote {
    id: number;
    quote: string;
    author: string;
    in_favourites: boolean;
}
interface QuotesProps {
    backend: string;
    displayQuotesPage: (display: boolean) => void;
}
export function Quotes(props: QuotesProps): JSX.Element {
    const backend = props.backend;
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [showQuotes, setShowQuotes] = useState(false);

    const get1Quote = async () => {
        const response = await axios.get(backend + "/1");
        setQuotes(response.data);
    };
    const get5Quotes = async () => {
        const response = await axios.get(backend + "/5");
        setQuotes(response.data);
    };
    const addToFavs = async (id: string) => {
        axios.post(backend + "/favourites", { id: id });
    };

    const handle1Selected = async () => {
        await get1Quote();
        setShowQuotes(true);
    };
    const handle5Selected = async () => {
        await get5Quotes();
        setShowQuotes(true);
    };

    const handleFavSelected = (q: Quote) => {
        const idString = String(q.id);
        addToFavs(idString);
        const quoteIndex = quotes.findIndex((quote) => quote.id === q.id);
        if (quoteIndex !== -1) {
            const updatedQuote = { ...q, in_favourites: true };
            const updatedQuotes = [
                ...quotes.slice(0, quoteIndex),
                updatedQuote,
                ...quotes.slice(quoteIndex + 1),
            ];
            setQuotes(updatedQuotes);
        }
    };
    const handleGoToFavs = () => {
        props.displayQuotesPage(false);
    };

    return (
        <>
            <div className="QuoteButtons">
                <button className="QuoteButton" onClick={handle1Selected}>
                    Get 1 Quote
                </button>
                <button className="QuoteButton" onClick={handle5Selected}>
                    Get 5 Quotes
                </button>
                <button className="BackButton" onClick={handleGoToFavs}>
                    Show Favourites
                </button>
            </div>
            <div className="Quotes">
                {showQuotes && (
                    <ul>
                        {quotes.map((q) => (
                            <SingleQuote
                                quote={q.quote}
                                author={q.author}
                                in_favourites={q.in_favourites}
                                favOrUnFav={() => {
                                    handleFavSelected(q);
                                }}
                                key={q.id}
                                id={q.id}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}

// star on quotes page not showing as yellow if already in favs
