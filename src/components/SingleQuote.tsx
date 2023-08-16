interface QuoteProps {
    id: number;
    quote: string;
    author: string;
    in_favourites: string;
    favOrUnFav: () => void;
}

export function SingleQuote(props: QuoteProps): JSX.Element {
    return (
        <li className="SingleQuote" key={props.id}>
            <label className="Quote">{`${props.quote} -- ${props.author}`}</label>
            <button className="Fav" onClick={props.favOrUnFav}>
                {props.in_favourites === "true" ? "⭐️" : "☆"}
            </button>
        </li>
    );
}
