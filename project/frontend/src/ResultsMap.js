import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

// TODO: add the CSS styling file
const mapStyles = {
  width: '100%',
  height: '100%',
};

export class MapContainer extends React.Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: -1.2884,
          lng: 36.8233,
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  // TODO: change this to be an imported key var when the
  // root file is created.
  apiKey: 'AIzaSyC0Q4CyO-BM4M5jPvL3ayJ09RfymZYQjhs',
})(MapContainer);
