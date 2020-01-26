import React from 'react';

const PriorityBagde = ({ priority }) => {
  priority = parseInt(priority);
  return (
    <span
      className={`mx-3 badge badge-${
        priority === 1
          ? 'success'
          : priority === 2
          ? 'success'
          : priority === 3
          ? 'warning'
          : priority === 4
          ? 'warning'
          : priority === 5
          ? 'danger'
          : 'dark'
      } `}
    >
      {priority}
    </span>
  );
};

export default PriorityBagde;
