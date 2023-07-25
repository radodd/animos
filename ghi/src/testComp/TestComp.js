import React from 'react';
import { useSelector } from 'react-redux';

const TestComp = () => {
    const locations = useSelector((state) => state.locations);
    console.log(locations);
    return (
        <div>
            {locations.map((location) => {
                <p>{location.name}</p>;
            })}
        </div>
    );
};

export default TestComp;
