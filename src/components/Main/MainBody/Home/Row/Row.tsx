import React from 'react';
import './row.css';
import { NavLink } from 'react-router-dom';

const Row = (props: any) => {
  //console.log(props.items?.featured);
  return (
    <div className="row">
      <div className="row__header">
        <p>{props.title || 'Title'}</p>
        <div>
          <button>left</button>
          <button>right</button>
        </div>
      </div>
      <div className="row__items">
        {props.items?.map((el: any, i: number) => {
          // console.log(el.images[0].url);
          return (
            <div className="row__item">
              <NavLink to={`/playlist/${el.id}`} key={el.id}>
                <div>
                  <img key={i} src={el.images[0].url} alt="" /> <div>{el.name}</div>{' '}
                  <div>{el.description}</div>
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
