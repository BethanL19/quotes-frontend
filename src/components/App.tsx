import "./style.css";
import { Quotes } from "./Quotes";
import { Favourites } from "./Favs";
import { useState } from "react";

function App() {
    const backend = "https://quotes-backend-pzru.onrender.com/quotes";
    const [displayQuotesPage, setDisplayQuotesPage] = useState(true);
    const handleDisplayChange = (display: boolean) => {
        setDisplayQuotesPage(display);
    };
    return (
        <div className="App">
            {displayQuotesPage === true ? (
                <Quotes
                    backend={backend}
                    displayQuotesPage={handleDisplayChange}
                />
            ) : (
                <Favourites
                    backend={backend}
                    displayQuotesPage={handleDisplayChange}
                />
            )}
            <a href="https://www.forbes.com/sites/kevinkruse/2013/05/28/inspirational-quotes/?sh=4a74f3d76c7a">
                Source
            </a>
        </div>
    );
}

export default App;
