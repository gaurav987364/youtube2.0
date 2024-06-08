import React from 'react';

const TagDisplay = ({ tags }) => {
  return (
    <div>
      {tags && tags.map((tag, index) => (
        <span key={index}>#{tag.trim()} </span>
      ))}
    </div>
  );
};

export default TagDisplay;