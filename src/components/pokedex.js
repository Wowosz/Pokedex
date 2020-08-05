import React, {useState, useEffect} from 'react';
import './pokedex.css';

export default function Pokedex() {
    const [pokenumber, setPokenumber] = useState(1);
    const [lastpokenumber, setLastpokenumber] = useState(0);
    const [pokeData, setPokeData] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if(lastpokenumber !== pokenumber){
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokenumber}`)
            .then(response => response.json())
            .then(data => {setPokeData(data)});
            setLastpokenumber(pokenumber);
            setTimeout(() => {setLoaded(true)}, 1000);
        }
    }, [pokenumber, pokeData, lastpokenumber, setLastpokenumber]);
    const handleIncrement = () => {
        pokenumber === 807 ? setPokenumber(1): setPokenumber(pokenumber + 1);
        console.log(pokenumber);
    }
    const handleDecrement = () => {
        pokenumber === 1 ? setPokenumber(807) : setPokenumber(pokenumber - 1);
        console.log(pokenumber);
    }
    const handleInput = (event) => {
        if(event.key === 'Enter' || event === 'button'){
            const number = document.getElementById('yellowInput1').value;
            if(number > 0 && number < 808){
                document.getElementById('yellowInput1').value = '';
                setPokenumber(Number(number));
                console.log(pokeData)
            } else {
                document.getElementById('yellowInput1').value = 'Error...'
                setTimeout(() => {document.getElementById('yellowInput1').value = ''}, 500);
            }
        }
    }
    const handleClick = (e) => {
        const nodes = Array.prototype.slice.call(e.currentTarget.children);
        let index = nodes.indexOf(e.target) +1;
        if(e.currentTarget.id === 'blueButtons2'){
            index += 5;
        }
        if(index === 10){
            index = 0;
        }
        document.getElementById('yellowInput1').value += index;
    }
    const handleDelete = () => {
        document.getElementById('yellowInput1').value = '';
    }
    
    return( loaded ?
    <div id="pokedex">
    <div id="left">
      <div id="logo"></div>
      <div id="bg_curve1_left"></div>
      <div id="bg_curve2_left"></div>
      <div id="curve1_left">
        <div id="buttonGlass">
          <div id="reflect"> </div>
        </div>
        <div id="miniButtonGlass1"></div>
        <div id="miniButtonGlass2"></div>
        <div id="miniButtonGlass3"></div>
      </div>
      <div id="curve2_left">
        <div id="junction">
          <div id="junction1"></div>
          <div id="junction2"></div>
        </div>
      </div>
      <div id="screen">
        <div id="topPicture">
          <div id="buttontopPicture1"></div>
          <div id="buttontopPicture2"></div>
        </div>
        <div id="picture">
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokenumber}.png`} alt="psykokwak" height="170" />
        </div>
        <div id="buttonbottomPicture"></div>
        <div id="speakers">
          <div className="sp"></div>
          <div className="sp"></div>
          <div className="sp"></div>
          <div className="sp"></div>
        </div>
      </div>
      <div id="bigbluebutton"></div>
      <div id="barbutton1"></div>
      <div id="barbutton2"></div>
      <div id="cross">
        <div id="leftcross">
          <div id="leftT" onClick={handleDecrement}></div>
        </div>
        <div id="topcross">
          <div id="upT"></div>
        </div>
        <div id="rightcross">
          <div id="rightT" onClick={handleIncrement}></div>
        </div>
        <div id="midcross">
          <div id="midCircle"></div>
        </div>
        <div id="botcross">
          <div id="downT"></div>
        </div>
      </div>
      <input id="yellowInput1" onKeyDown={handleInput}></input>
    </div>
    <div id="right">
      <div id="stats">
        <strong>Name:</strong> {pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1)}<br/>
        <strong>Types:</strong><br/> {pokeData.types.map(element => {
            return <span>{element.type.name.charAt(0).toUpperCase() + element.type.name.slice(1)} <br/></span>
        })}
        <strong>Height:</strong> {pokeData.height}<br/>
        <strong>Weight:</strong> {pokeData.weight}<br/><br/>
        <strong>Attacks</strong><br/>
        {pokeData.moves.map(element => {
            return <span>{element.move.name.charAt(0).toUpperCase() + element.move.name.slice(1)}<br/></span>;
        })}
      </div>
      <div id="blueButtons1" onClick={handleClick}>
        <button className="blueButton">1</button>
        <button className="blueButton">2</button>
        <button className="blueButton">3</button>
        <button className="blueButton">4</button>
        <button className="blueButton">5</button>
      </div>
      <div id="blueButtons2" onClick={handleClick}>
        <button className="blueButton">6</button>
        <button className="blueButton">7</button>
        <button className="blueButton">8</button>
        <button className="blueButton">9</button>
        <button className="blueButton">0</button>
      </div>
      <div id="miniButtonGlass4"></div>
      <div id="miniButtonGlass5"></div>
      <button id="barbutton3" onClick={() => handleInput('button')}></button>
      <button id="barbutton4" onClick={handleDelete}></button>
      <div id="yellowBox1"></div>
      <div id="yellowBox2"></div>
      <div id="bg_curve1_right"></div>
      <div id="bg_curve2_right"></div>
      <div id="curve1_right"></div>
      <div id="curve2_right"></div>
    </div>
  </div> :
  <div><p>Loading</p></div>
  );
}