import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Main = () => {
   return (
  <div className='max-w-lg mx-auto gap-3'>
        <Header></Header>                      
       <Outlet></Outlet>                                                                                   
  </div>
 );
};

export default Main;