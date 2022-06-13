/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Zutaten from './components/Zutaten';
import Search from './components/Search';
import axios from 'axios';

const url = 'http://localhost:3001/';

function App() {
    const [gerichte, setGerichte] = useState([]);
    const [filteredGerichte, setFilteredGerichte] = useState([]);
    // const [searchItems, setSearchItems] = useState([]);
    const [inputValue, setInputValue] = useState('');

    // TODO: I get error from this code: "gerichte" is undefined
    // useEffect(() => {
    //     const getGerichte = async () => {
    //         const res = await fetch(url);
    //         const json = await res.json();
    //         const _gerichte = json.gerichte;
    //         console.log(_gerichte);
    //         setGerichte(_gerichte);
    //     };
    //     getGerichte();
    // }, []);

    // WORKS WITH FETCH
    // useEffect(() => {
    //     (async () => {
    //         const response = await fetch(url);
    //         const _gerichte = await response.json();
    //       console.log(_gerichte);
    //         setGerichte(_gerichte);
    //     })();
    // }, []);

    const filterGerichte = () => {
			let _filteredGerichte = [];
			if (inputValue === '') {
				_filteredGerichte = gerichte;
			} else {
        _filteredGerichte = gerichte.filter((m) =>
            m.name.toLowerCase().includes(inputValue.toLowerCase())
        );
			}
        setFilteredGerichte(_filteredGerichte);
    };

    // WORKS WITH AXIOS:
    useEffect(() => {
        (async () => {
            const _gerichte = (await axios.get(url)).data;
            setGerichte(_gerichte);
        })();
    }, []);

    useEffect(() => {
        filterGerichte();
    }, [gerichte]);

    useEffect(() => {
        filterGerichte();
    }, [inputValue]);

    /*   useEffect(() => {
		const result = gerichte.filter((gericht) => {
			return gericht.zutaten;
		})
	}, [searchItems]) */

    const handleChange = (e) => {
        setInputValue(e.target.value);
        filterGerichte();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // setSearchItems([...searchItems, inputValue]);
    };

    return (
        <div className="u-container">
            <h1>Restegourmet</h1>

            {filteredGerichte.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <>
                    <Search
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                    />
                    {filteredGerichte.map((gericht, index) => {
                        return (
                            <>
                                <Card
                                    key={index}
                                    style={{ width: '18rem' }}
                                    className="mt-8"
                                >
                                    <Card.Img
                                        variant="top"
                                        src={`../../img/${gericht.id}.jpeg`}
                                    />
                                    <Card.Body key={200}>
                                        <Card.Title>{gericht.name}</Card.Title>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <Zutaten zutaten={gericht.zutaten} />
                                    </ListGroup>
                                    <Card.Body key={201}>
                                        <Card.Link href="#">
                                            Zur Zubereitung
                                        </Card.Link>
                                    </Card.Body>
                                </Card>
                            </>
                        );
                    })}
                </>
            )}
        </div>
    );
}

export default App;
