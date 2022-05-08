import './App.css';
import Navigation from './components/Navigation/Navigation';
import React from 'react';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from "react-tsparticles";
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Card from './components/Card/Card';
import Register from './components/Register/Register';

const app = new Clarifai.App({
  apiKey: '889e7b1746a946a2b40038ced5364a66'
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'sign in',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  resetUser = () => {
    this.setState(
      {input: '',
       imageUrl: '',
       box: {},
       user: {
          id: '',
          name: '',
          email: '',
          entries: 0,
          joined: ''
    }})
  }
  
  
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  componentDidMount() {
    fetch('https://stark-tor-20383.herokuapp.com/')
      .then(response => response.json())
      .then(console.log('were on'))
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  
  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => {
      console.log(response)  
      if (response) {
          fetch('https://stark-tor-20383.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count }))
            
          })
      }
      for(let i = 0; i < response.outputs.data.regions.length; i++) {
        this.displayFaceBox(this.calculateFaceLocation(response.outputs.data.regions[i]))
      }
      
    })
    .catch(err => console.log(err));
  }
  
  onRouteChange = (route) => {
    this.setState({route: route})
  }
  

  render() {
    const particlesInit = (main) => {
      console.log(main);
  
    };
  
    const particlesLoaded = (container) => {
      console.log(container);
    };
    
    return (
      <div className='App'>
      <Particles className='particles'
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: false,
              mode: "push",
            },
            onHover: {
              enable: false,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 6,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 40,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            random: true,
            value: 1,
          },
        },
        detectRetina: true,
      }}
    />
         
    {
      (() => {
        if(this.state.route === 'sign in') {
          return (
          <Card onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          )
        } else if (this.state.route === 'register') {
          return (
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        } else {
          return (
            <div> 
          <Navigation onRouteChange={this.onRouteChange} resetUser={this.resetUser}/>
          <Logo />
          <Rank 
            name={this.state.user.name}
            entries={this.state.user.entries}
          />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
        </div>
          )
        }
      })()
    }
      </div>
    );
  }
}
export default App;
