import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

// Components
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import './row.css';

const Row = (props: any) => {
  const [offset, setOffset] = useState(0);
  const offsets = [
    '0',
    'calc(-100vw + (232px + 25px))',
    'calc(-200vw + (464px + 50px))',
    'calc(-300vw + (696px + 75px))',
    'calc(-300vw + (928px + 100px))',
  ];

  const changeOffset = (newValue: number) => {
    if (Math.ceil(props.items.length / 6) === newValue) {
      setOffset(0);
    } else if (newValue <= 0) {
      setOffset(Math.ceil(props.items.length / 6) - 1);
    } else {
      setOffset(newValue);
    }
  };

  return (
    <div className="row">
      <div className="row__header">
        <p>{props.title || 'Title'}</p>
        <div>
          <ChevronLeftIcon
            onClick={() => {
              changeOffset(offset - 1);
            }}></ChevronLeftIcon>
          <ChevronRightIcon
            onClick={() => {
              changeOffset(offset + 1);
            }}></ChevronRightIcon>
        </div>
      </div>
      <div className="row__items" style={{ transform: `translateX(${offsets[offset]})` }}>
        {props.items?.map((el: any, i: number) => {
          // console.log(el.images[0].url);
          return (
            <div key={el.id} className="row__item">
              <NavLink to={`/playlist/${el.id}`} key={el.id}>
                <div>
                  <img key={i} src={el.images[0].url} alt={el.name} />
                  <span className="item__name">{el.name}</span>
                  <p className="item__description">{el.description}</p>
                </div>
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Row;
