import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import sunImage from '../assets/sun.svg';
import moonImage from '../assets/moon.svg';

const Weather = () => {
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [favoriteCity, setFavoriteCity] = useState('');
    const [favoriteCountry, setFavoriteCountry] = useState('');
    const [textColor, setTextColor] = useState('#000000');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        const savedFavoriteCity = localStorage.getItem('favoriteCity');
        const savedFavoriteCountry = localStorage.getItem('favoriteCountry');
        const savedTextColor = localStorage.getItem('textColor');
        const savedBgColor = localStorage.getItem('bgColor');

        if (savedFavoriteCity) setFavoriteCity(savedFavoriteCity);
        if (savedFavoriteCountry) setFavoriteCountry(savedFavoriteCountry);
        if (savedTextColor) setTextColor(savedTextColor);
        if (savedBgColor) setBgColor(savedBgColor);
    }, []);

    useEffect(() => {
        document.body.style.backgroundColor = bgColor;
    }, [bgColor]);

    useEffect(() => {
        if (favoriteCity) {
            setCity(favoriteCity);
            setCountry(favoriteCountry)
            fetchWeather(favoriteCity, favoriteCountry);
        }
    }, [favoriteCity, favoriteCountry])

    const fetchWeather = async (cityToFetch = city, countryToFetch = country) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityToFetch},${countryToFetch}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
            );
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            setWeather(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            setWeather(null);
        }
    };

    const formatTime = (timetamp) => {
        const date = new Date(timetamp * 1000);
        return date.toLocaleTimeString();
    };

    const isDaytime = (sunrise, sunset) => {
        const now = new Date().getTime() / 1000;
        return now > sunrise && now < sunset;
    };

    const saveSettings = () => {
        localStorage.setItem('favoriteCity', favoriteCity);
        localStorage.setItem('favoriteCountry', favoriteCountry);
        localStorage.setItem('textColor', textColor);
        localStorage.setItem('bgColor', bgColor);
    };

    return (
        // <div style={{ color: textColor }}>
        //     <h1>Weather App</h1>
        //     <input 
        //         type="text" 
        //         value={city} 
        //         onChange={(e) => setCity(e.target.value)} 
        //         placeholder="Enter city name"
        //     />
        //     <input 
        //         type="text" 
        //         value={country} 
        //         onChange={(e) => setCountry(e.target.value)} 
        //         placeholder="Enter country code (e.g. US)"
        //     />
        //     <button onClick={fetchWeather}>Get Weather</button>


        //     {error && <p style={{ color: 'red' }}>{error}</p>}
        //     {weather && (
        //         <div>
        //             <h2>{weather.name}</h2>
        //             <p>Temperature: {weather.main.temp} °C</p>
        //             <p>Wind speed: {weather.wind.speed} m/s</p>
        //             <p>Weather: {weather.weather[0].description}</p>
        //             <p>Sunrise: {formatTime(weather.sys.sunrise)}</p>
        //             <p>Sunset: {formatTime(weather.sys.sunset)}</p>
        //             <img
        //                 src={isDaytime(weather.sys.sunrise, weather.sys.sunset) ? sunImage : moonImage}
        //                 alt={isDaytime(weather.sys.sunrise, weather.sys.sunset) ? "Sun" : "Moon"}
        //                 style={{ width: '100px', height: '100px', marginTop: '20px' }}
        //             />
        //         </div>
        //     )}

        //     <h2>Settings</h2>
        //     <div>
        //         <label>
        //             Favorite City:
        //             <input
        //                 type="text"
        //                 value={favoriteCity}
        //                 onChange={(e) => setFavoriteCity(e.target.value)}
        //                 placeholder="Enter your favorite city"
        //             />
        //         </label>
        //     </div>
        //     <div>
        //         <label>
        //             Text Color:
        //             <input
        //                 type="color"
        //                 value={textColor}
        //                 onChange={(e) => setTextColor(e.target.value)}
        //             />
        //         </label>
        //     </div>
        //     <div>
        //         <label>
        //             Background Color:
        //             <input
        //                 type="color"
        //                 value={bgColor}
        //                 onChange={(e) => setBgColor(e.target.value)}
        //             />
        //         </label>
        //     </div>
        //     <button onClick={saveSettings}>Save Settings</button>
        // </div>
        <Container style={{ color: textColor }}>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <h1>Weather App</h1>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Enter city name"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="Enter country code (e.g. US)"
                        />
                    </Form.Group>
                    <Button onClick={() => fetchWeather()} className="mb-3">Get Weather</Button>

                    <div className="text-center">
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {weather && (
                            <Card className="text-center">
                                <Card.Body>
                                    <Card.Title>{weather.name}, {weather.sys.country}</Card.Title>
                                    <Card.Text>
                                        Temperature: {weather.main.temp}°C
                                        <br />
                                        Weather: {weather.weather[0].description}
                                        <br />
                                        Wind speed: {weather.wind.speed} m/s
                                        <br />
                                        Sunrise: {formatTime(weather.sys.sunrise)}
                                        <br />
                                        Sunset: {formatTime(weather.sys.sunset)}
                                    </Card.Text>
                                    <img
                                        src={isDaytime(weather.sys.sunrise, weather.sys.sunset) ? sunImage : moonImage}
                                        alt={isDaytime(weather.sys.sunrise, weather.sys.sunset) ? "Sun" : "Moon"}
                                        style={{ width: '100px', height: '100px', marginTop: '20px' }}
                                    />
                                </Card.Body>
                            </Card>
                        )}
                        <Button onClick={() => setShowSettings(!showSettings)} className="mt-3">
                            {showSettings ? 'Hide Settings' : 'Show Settings'}
                        </Button>
                    </div>
                    {showSettings && (
                        <div className="mt-3">
                            <h2>Settings</h2>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Favorite City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={favoriteCity}
                                        onChange={(e) => setFavoriteCity(e.target.value)}
                                        placeholder="Enter your favorite city"
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Favorite Country</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={favoriteCountry}
                                        onChange={(e) => setFavoriteCountry(e.target.value)}
                                        placeholder="Enter your favorite country code (e.g. US)"
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Text Color</Form.Label>
                                    <Form.Control
                                        type="color"
                                        value={textColor}
                                        onChange={(e) => setTextColor(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Background Color</Form.Label>
                                    <Form.Control
                                        type="color"
                                        value={bgColor}
                                        onChange={(e) => setBgColor(e.target.value)}
                                    />
                                </Form.Group>
                                <Button onClick={saveSettings} className="mt-3">Save Settings</Button>
                            </Form>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Weather;