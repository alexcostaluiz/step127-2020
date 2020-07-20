import getRecommendation from '../scripts/recommendation_script.js';
import MapContainer from '../components/ResultsMap.js';
import Modal from '../components/Modal.js';
import React, { useState, useEffect } from 'react';

function MatchResultsPage(props) {
  const formState = props.location.state;
  const userLocation = formState.currLocation;

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecommendation(formState, (result) => {
      setRestaurants(result);
      setLoading(false);
    });
  }, [formState]);

  return [
    <Modal key='loading-modal' open={loading} center={true}>
      <div style={{ height: '300px', width: '300px' }}>
        <p>Hi there your results are loading...</p>
      </div>
    </Modal>,
    <MapContainer restaurants={restaurants} userLocation={userLocation} />,
  ];
}

export default MatchResultsPage;
