import React from 'react';
import WeatherComponent from '../../components/WeatherComponent';
import JokeComponent from '../../components/JokeComponent';
import '../../App.css'
import Block from '../../components/UI/Block/Block';

const Home = () => {
    return (
        <div class="page">

            <div className="banner-container">

                <div className="banner">
                </div>
            </div>

            <Block>
                <WeatherComponent />
                <JokeComponent />
            </Block>

        </div>
    );
};

export default Home;