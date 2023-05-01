import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiamond } from '@fortawesome/free-solid-svg-icons';

function App() {

  return (
    <div class="board">
      <div class="center-logo"></div>
      <div class="background-theme"></div>
      <div class="community-chest-pile">
        <div class="community-chest-rectangle">
          <span class="community-chest-text">Community Chest</span>
          </div>
          </div>
      <div class="chance-pile">
        <div class="chance-pile-rectangle">
          <span class="chance-text">Chance</span>
          </div>
          </div>

    {/* bottom row properties */}
    <div class="cell cell-bottom visiting-jail cell-left" ></div>
		<div class="cell light-blue cell-bottom">
    <span class="prop-name">Connecticut Avenue</span>
    <span class="price">price $120</span></div>
    <div class="cell light-blue cell-bottom">
    <span class="prop-name">Vermont Avenue</span>
    <span class="price">price $100</span></div>
    <div class="cell cell-bottom chance"></div>
    <div class="cell light-blue cell-bottom">
    <span class="prop-name">Oriental Avenue</span>
    <span class="price">price $100</span></div>
    <div class="cell cell-bottom rail-road"> 
    <span class="rr-and-utilities-name">Reading Railroad</span>
    <span class="price">price $200</span></div>
    <div class="cell cell-bottom">
    <span class="income-tax">Income Tax <br/><FontAwesomeIcon icon={faDiamond}/>
    <span class="income-tax-details"><br/>Pay 10% <br/> or <br/> $200</span>
</span></div>
    <div class="cell cell-bottom brown">
    <span class="prop-name">Baltic Avenue</span>
    <span class="price">price $60</span></div>
    <div class="cell cell-bottom community-chest"></div>
    <div class="cell cell-bottom brown">
    <span class="prop-name">Mediterranean Avenue</span>
    <span class="price">price $60</span></div>
    <div class="cell go cell-bottom"></div>

    {/* left row properties */}
		<div class="cell purple cell-left st-charles">
    <span class="prop-name">St Charles Place</span>
    <span class="price">price $140</span></div>
		<div class="cell cell-left electric electric-company">
    <span class="rr-and-utilities-name">Electric Company</span>
    <span class="price">price $150</span></div>
		<div class="cell cell-left purple states-ave">
    <span class="prop-name">States Avenue</span>
    <span class="price">price $140</span></div>
		<div class="cell cell-left purple virginia-ave">
    <span class="prop-name">Virginia Avenue</span>
    <span class="price">price $160</span></div>
		<div class="cell cell-left rail-road penn-rr">
    <span class="rr-and-utilities-name">Pennsylvania Railroad</span>
    <span class="price">price $200</span></div>
		<div class="cell cell-left orange st-james">
    <span class="prop-name">St James Place</span>
    <span class="price">price $180</span>
    </div>
		<div class="cell cell-left community-chest-left community-chest"></div>
		<div class="cell cell-left tennessee-ave orange ">
    <span class="prop-name">Tennessee Avenue</span>
    <span class="price">price $180</span></div>
		<div class="cell cell-left new-york-ave orange ">
    <span class="prop-name">New York Avenue</span>
    <span class="price">price $200</span></div>
		<div class="cell cell-left free-parking"></div>

    {/* top row properties */}
		<div class="cell red cell-top">
    <span class="prop-name">Kentucky Avenue</span>
    <span class="price">price $220</span></div>
		<div class="cell cell-top chance"></div>
		<div class="cell red cell-top">
    <span class="prop-name">Indiana Avenue</span>
    <span class="price">price $220</span></div>
		<div class="cell red cell-top">
    <span class="prop-name">Illinois Avenue</span>
    <span class="price">price $240</span></div>
		<div class="cell rail-road cell-top">
    <span class="rr-and-utilities-name">B & O Railroad</span>
    <span class="price">price $200</span></div>
		<div class="cell yellow cell-top">
    <span class="prop-name">Atlantic Avenue</span>
    <span class="price">price $260</span></div>
		<div class="cell yellow cell-top">
    <span class="prop-name">Ventnor Avenue</span>
    <span class="price">price $260</span></div>
		<div class="cell water cell-top water-works">
    <span class="rr-and-utilities-name">Water Works</span>
    <span class="price">price $150</span></div>
		<div class="cell yellow cell-top">
    <span class="prop-name">Marvin Gardens</span>
    <span class="price">price $280</span></div>
		<div class="cell cell-top go-to-jail"></div>

    {/* right row properties */}
		<div class="cell cell-right green">
    <span class="prop-name">Pacific Avenue</span>
    <span class="price">price $300</span></div>
		<div class="cell cell-right green">
    <span class="prop-name">North Carolina Avenue</span>
    <span class="price">price $300</span></div>
		<div class="cell cell-right community-chest"></div>
    <div class="cell cell-right green">
    <span class="prop-name">Pennsylvania Avenue</span>
    <span class="price">price $320</span></div>
		<div class="cell cell-right rail-road">
    <span class="rr-and-utilities-name">Short Line Railroad</span>
    <span class="price">price $200</span></div>
		<div class="cell cell-right chance"></div>
		<div class="cell cell-right dark-blue">
    <span class="prop-name">Park Place</span>
    <span class="price">price $350</span></div>
		<div class="cell cell-right luxury-tax"></div>
		<div class="cell cell-right dark-blue">
    <span class="prop-name">Boardwalk</span>
    <span class="price">price $400</span></div>
	</div>

  );
}

export default App;
