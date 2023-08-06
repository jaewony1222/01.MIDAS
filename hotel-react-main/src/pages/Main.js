import React from 'react';
import { useDispatch } from 'react-redux';
import SpecialContainer from '../containers/SpecialContainer';
import { setMenu } from '../modules/logincheck';
import Promotion from './Promotion';
import VisualSlider from './VisualSlider';
const Main = () => {
    const dispatch = useDispatch()
    dispatch(setMenu(false))
    return (
        <div>
           <VisualSlider/>
           <SpecialContainer isMain={true} limits={3}/>
           <Promotion/>
        </div>
    );
};
export default Main;