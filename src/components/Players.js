import React from 'react'
import usePlayers from '../hooks/usePlayers'
import { 
  Route, 
  Switch,
  Link, 
  useParams, 
  useRouteMatch 
} from "react-router-dom";
import slug from 'slug'
import Sidebar from './Sidebar'
import Loading from './Loading'

const Player = ({ players }) => {
  const { playerId }= useParams()
  const player = players.find(player => slug(player.name) === playerId)

  return (
    <div className="panel fade-enter-done">
      <img src={player.avatar} alt={`${player.name}'s avatar`} className="avatar"/>
      <h1 className="medium-header">{player.name}</h1>
      <h3 className="header">{player.number}</h3>
      <div className="row">
        <ul className="info-list" style={{marginRight: 80}}>
          <li>Team</li>
          <div>
            <Link to={`/${player.teamId}`}>
              {player.teamId}
            </Link>
          </div>
          <li>Position<div>{player.position}</div></li>
          <li>PPG<div>{player.ppg}</div></li>
        </ul>
        <ul className='info-list'>
          <li>APG<div>{player.apg}</div></li>
          <li>SPG<div>{player.spg}</div></li>
          <li>RPG<div>{player.rpg}</div></li>
        </ul>
      </div>
    </div>
  )
}

const Players = () => {
  const { url } = useRouteMatch()

  const {
    response: players,
    loading
  } = usePlayers()
  
  if (loading === true) {
    return <Loading />
  }
  
  return (
    <div className="container two-column">
      <Sidebar
        title="Players"
        list={players.map(player => player.name)}
      />
      <Switch>
        <Route path={`${url}/:playerId`}>
          <Player players={players}/>
        </Route>
        <Route path="*">
          <div className="sidebar-instruction">Select a player</div>
        </Route>
      </Switch>
    </div>
  )
}

export default Players