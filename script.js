const keys = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];
const sources = [
{ "key": 'Q', "source": "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3", "text": "Heater 1" },
{ "key": 'W', "source": "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3", "text": "Heater 2" },
{ "key": 'E', "source": "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3", "text": "Heater 3" },
{ "key": 'A', "source": "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3", "text": "Heater 4" },
{ "key": 'S', "source": "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3", "text": "Heater 6" },
{ "key": 'D', "source": "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3", "text": "Dsc" },
{ "key": 'Z', "source": "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3", "text": "Kick & Hat" },
{ "key": 'X', "source": "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3", "text": "Kick" },
{ "key": 'C', "source": "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3", "text": "Cev" }];


class Button extends React.Component
{
  constructor(props)
  {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount()
  {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount()
  {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(event)
  {
    switch (event.keyCode) {

      case 65:
      case 97:
        document.getElementById('A').click();
        break;
      case 67:
      case 99:
        document.getElementById('C').click();
        break;
      case 68:
      case 100:
        document.getElementById('D').click();
        break;
      case 69:
      case 101:
        document.getElementById('E').click();
        break;
      case 81:
      case 113:
        document.getElementById('Q').click();
        break;
      case 83:
      case 115:
        document.getElementById('S').click();
        break;
      case 87:
      case 119:
        document.getElementById('W').click();
        break;
      case 88:
      case 120:
        document.getElementById('X').click();
        break;
      case 90:
      case 122:
        document.getElementById('Z').click();
        break;}

  }

  render()
  {
    let source = sources.filter(s => s["key"] === this.props.letter).map(e => e["source"])[0];
    return (
      React.createElement(React.Fragment, null,
      React.createElement("button", { id: this.props.id, className: `drum-pad col-xl-4 btn btn-primary ${this.props.isMiddle ? "middle" : ""}`, onClick: () => this.props.handleClick(this.props.letter) },
      this.props.letter,
      React.createElement("audio", { id: this.props.letter, src: source, className: "clip" }))));



  }}


const Title = props => React.createElement("h1", { className: "text-primary text-center" }, props.title);

class DrumApp extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = { letter: "" };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(letter)
  {
    this.setState({ letter: letter });
    const sound = document.getElementById(`${letter}`);
    sound.currentTime = 0;
    sound.play();
  }

  render()
  {
    return (
      React.createElement("div", { class: "container" },
      React.createElement("div", { className: "d-flex justify-content-center align-items-center vh-100" },
      React.createElement("div", { id: "drum-machine", className: "row" },
      React.createElement(Title, { title: "Drum machine - try it!", className: "col-xl-12" }),
      React.createElement("div", { className: "col-xl-9" },
      keys.map((e, i) => React.createElement(Button, { id: i, letter: e, isMiddle: [1, 4, 7].includes(i), handleClick: this.handleClick }))),

      React.createElement("div", { id: "display", className: "col-xl-3" },
      this.state.letter !== "" ? sources.filter(e => e["key"] === this.state.letter).map(s => s["text"])[0] : "")))));





  }}


ReactDOM.render(React.createElement(DrumApp, null), document.getElementById("root"));