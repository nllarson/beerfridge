import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router';
import App from './components/navigation/App.jsx';
import BeerLeaderBoard from './components/beer/BeerLeaderBoard.jsx';
import BeerInStock from './components/beer/BeerInStock.jsx';
import BeerList from './components/beer/BeerList.jsx';
import BeerView from './components/beer/BeerView.jsx';

ReactDOM.render(
    <Router>
        <Route path="/" component={App}>
          <Route path="view/:id" component={BeerView}/>
          <Route path="stocked" component={BeerInStock}/>
          <Route path="leaderboard" component={BeerLeaderBoard}/>
          <Route path="list" component={BeerList}/>
        </Route>
    </Router>,
    document.getElementById('main')
);