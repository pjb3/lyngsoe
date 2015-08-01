var React = require('react');

var Note = React.createClass({
  sayHi(){
    console.log('hi')
    let data = {
      name: this.props.name
    }

    fetch('/entries', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((d) => d.json()).then((data) =>{
      console.log('done!', data)
    })
  }

  render() {
    return (
      <div onClick={this.sayHi.bind(this)}>
        {this.props.name}
      </div>
    );
  }
})

module.exports = Note;
