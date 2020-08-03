import React from 'react';

import ButtonGroup from './ButtonGroup.js';
import PreferenceForm from './PreferenceForm.js';

/**
 * A form used to gather the restaurant preferences of a user for the 'Find My Match'
 * service.
 *
 * @param {!Object<string, number>} currLocation The current latitude and longitude
 *     coordinates of the user.
 * @param {string} locationName The formatted address of the current user.
 */
function ProfileForm(props) {
  const itemLabels = {
    cuisine: 'Preferred Cuisine',
    location: 'Your Location',
    distance: 'Preferred Distance',
    price: 'Price Level',
    experience: 'Dining Experience',
  };
  return (
    <PreferenceForm headerLabel='Your Profile' rowItemLabels={itemLabels}>
      <ButtonGroup labelList={['1 mile', '5 miles', '10 miles', '25 miles']} />
      <ButtonGroup labelList={['$', '$$', '$$$', '$$$$']} />
      <ButtonGroup labelList={['Takeout', 'Delivery', 'Dine-In']} />
    </PreferenceForm>
  );
}

export default ProfileForm;
