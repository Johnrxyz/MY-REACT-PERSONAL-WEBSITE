import React, { useState, useEffect } from 'react';
import './Search.css';

function BookBrowser() {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('a');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const maxResults = 12;

    useEffect(() => {
        setLoading(true);
        const startIndex = page * maxResults;
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&startIndex=${startIndex}&maxResults=${maxResults}`)
            .then(res => res.json())
            .then(data => {
                let items = data.items || [];
                items.sort((a, b) => {
                    const titleA = a.volumeInfo.title?.toLowerCase() || '';
                    const titleB = b.volumeInfo.title?.toLowerCase() || '';
                    return order === 'asc'
                        ? titleA.localeCompare(titleB)
                        : titleB.localeCompare(titleA);
                });
                setBooks(items);
                setLoading(false);
            });
    }, [search, page, order]);

    function handleUpload () {
        return
    }

    function setFile () {
        return
    }

    return (
        <div className="book-browser">
            <h2>Browse Books</h2>

            <input
                type="text"
                placeholder='Type something like "Naynes Gamba"'
                onChange={e => {
                    setSearch(e.target.value || 'a');
                    setPage(0);
                }}
            /> 
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem 0' }}>
                <div>
                    <input
                        type="file"
                        onChange={e => setFile(e.target.files[0])}
                        style={{ marginRight: '0.5rem' }}
                    />
                    <button onClick={handleUpload}>Upload File</button>
                </div>

                <div style={{margin: '1rem 0'}}>
                    <button style={{fontWeight:'bold', borderRadius:'10px', padding:'5px'}} onClick={() => setOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}>
                        Sort by Title: {order === 'asc' ? 'A–Z' : 'Z–A'}
                    </button>
                </div>
            </div>
            

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="book-grid">
                    {books.map(book => {
                        const info = book.volumeInfo;
                        return (
                            <div className="book-card" key={book.id}>
                                {info.imageLinks?.thumbnail ? (
                                    <img src={info.imageLinks.thumbnail} alt={info.title} />
                                ) : (
                                    <p>No Image</p>
                                )}
                                <h3>{info.title?.length > 40 ? info.title.slice(0, 60) + '...' : info.title}</h3>
                                <p>{info.authors?.join(', ') || 'Unknown Author'}</p>
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="pagination">
                <button
                    disabled={page === 0}
                    onClick={() => setPage(p => Math.max(p - 1, 0))}
                >
                    Previous
                </button>
                <span>Page {page + 1}</span>
                <button onClick={() => setPage(p => p + 1)}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default BookBrowser;
