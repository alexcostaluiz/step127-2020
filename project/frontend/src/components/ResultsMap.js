// TODO: Change file name to MapContainer.js to match the component name.
import React, { Fragment, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Lunch from '../assets/lunch.svg';

function MapContainer(props) {
  const {
    restaurants,
    userLocation,
    currentCardIndex,
    setCurrentCardIndex,
  } = props;
  const center =
    restaurants.length === 0
      ? userLocation
      : restaurants[currentCardIndex].key.latLngCoords;
  const [showInfoWindows, setShowInfoWindows] = useState({
    marker0: false,
    marker1: false,
    marker2: false,
    marker3: false,
    marker4: false,
    marker5: false,
    marker6: false,
  });

  // TODO: Add marker for "you are here location".
  const MarkerIcon = (props) => {
    const markerID = props.id;
    const markerName = 'marker' + markerID;
    // TODO: Check the casing of the restaurant name (some come back all caps).
    const restaurantName = restaurants[markerID].key.name;
    const percentValue = Math.round(restaurants[markerID].value * 100);
    return (
      <Fragment>
        <img src={Lunch} alt={'lunch icon'} />
        {(markerID === currentCardIndex || showInfoWindows[markerName]) && (
          <InfoWindow
            restaurantName={restaurantName}
            percentMatch={percentValue + '%'}
          />
        )}
      </Fragment>
    );
  };

  const InfoWindow = (props) => {
    const restaurantName = props.restaurantName;
    const percentMatch = props.percentMatch;
    const infoWindowStyle = {
      position: 'relative',
      bottom: 80,
      left: '-45px',
      width: 220,
      backgroundColor: 'white',
      boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
      padding: 10,
      fontSize: 14,
      zIndex: 100,
    };

    return (
      <div style={infoWindowStyle}>
        <div style={{ fontSize: 16 }}>
          <span style={{ float: 'right' }}>{percentMatch}</span>
          {restaurantName}
        </div>
      </div>
    );
  };

  // TODO: add a spec here to explain what's happening.
  const createMarkers = () => {
    if (restaurants.length === 0) {
      return null;
    }
    const markers = [];
    let coords = restaurants[currentCardIndex].key.latLngCoords;
    markers.push(
      <MarkerIcon
        lat={coords.lat}
        lng={coords.lng}
        id={currentCardIndex}
        aria-label={'Your #' + (currentCardIndex + 1) + ' Match'}
      />
    );
    const numOfMarkers = Math.min(restaurants.length, 3);
    // TODO: explain logic of for loop.
    for (let i = 1; i <= numOfMarkers; i++) {
      const nextCardIndex = currentCardIndex + i;
      if (isValidIndex(nextCardIndex)) {
        coords = restaurants[nextCardIndex].key.latLngCoords;
        markers.push(
          <MarkerIcon
            lat={coords.lat}
            lng={coords.lng}
            id={nextCardIndex}
            aria-label={'Your #' + (nextCardIndex + 1) + ' Match'}
          />
        );
      }
      const previousCardIndex = currentCardIndex - i;
      if (isValidIndex(previousCardIndex)) {
        coords = restaurants[previousCardIndex].key.latLngCoords;
        markers.push(
          <MarkerIcon
            lat={coords.lat}
            lng={coords.lng}
            id={previousCardIndex}
            aria-label={'Your #' + (previousCardIndex + 1) + ' Match'}
          />
        );
      }
    }
    return markers;
  };

  /** Checks that the current index is a valid index for
   * the restaurant matches list.
   */
  const isValidIndex = (index) => {
    return index >= 0 && index < restaurants.length;
  };

  /** Info Window with name and match appears when the mouse hovers
   * over the marker.
   */
  const onMouseEnterMarker = (props, marker) => {
    const markerName = 'marker' + marker.id;
    let showInfoWindowsChange = showInfoWindows;
    showInfoWindowsChange[markerName] = true;
    setShowInfoWindows(showInfoWindowsChange);
  };

  /** Info window with name and match disappears when the mouse
   * leaves the marker.
   */
  const onMouseLeaveMarker = (props, marker) => {
    const markerName = 'marker' + marker.id;
    let showInfoWindowsChange = showInfoWindows;
    showInfoWindowsChange[markerName] = false;
    setShowInfoWindows(showInfoWindowsChange);
  };

  const onMouseClickMarker = (props, marker) => {
    setCurrentCardIndex(marker.id);
  };

  const mapStyle = { height: '100vh', width: '50%' };
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
      center={center}
      defaultZoom={14}
      style={mapStyle}
      onChildMouseEnter={onMouseEnterMarker}
      onChildMouseLeave={onMouseLeaveMarker}
      onChildClick={onMouseClickMarker}
      aria-label={'Google Map with top 4 restaurant markers.'}>
      {createMarkers()}
    </GoogleMapReact>
  );
}

export default MapContainer;
