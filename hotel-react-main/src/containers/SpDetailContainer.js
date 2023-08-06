import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Title from '../components/Title';
import { API_URL } from '../config/apiurl';
import { setMenu } from '../modules/logincheck';
import { getData } from '../modules/special';

const SpDetailContainer = () => {
    const { no } = useParams()
    const { data, loading, error } = useSelector(state => state.special.special);
    const dispatch = useDispatch();
    const getSpacialData = async () => {
        const data = axios.get(`${API_URL}/special/${no}`);
        return data;
    }
    dispatch(setMenu(false))
    useEffect(() => {
        dispatch(getData(getSpacialData))
    },[])
    if (loading) return <div>로딩중입니다.</div>
    if (error) return <div>에러가 발생했습니다.</div>
    if (!data) return <div>데이터가 없습니다.</div>
    return (

        <div className='inner'>
            <Title title="PACKAGE"></Title>
            <div className='package'>
                <div>{data[0].e_title}</div>
                <div>{data[0].e_time}</div>
                <div>
                    <img src={`${API_URL}/upload/event/${data[0].e_img1}`} alt=""/>
                </div>
                <div>{data[0].e_titledesc}</div>
                <div>
                    <h2>이용안내</h2>
                  
<p>※ 트니트니 어드벤처 휴점일 : 2023년 3월 14일(화), 4월 18일(화), 6월 20일(화)</p>
<p>※ 트니트니 어드벤처 리뉴얼 공사 휴점일 : 2023년 2월 27일(월) ~ 3월 1일(수), 5월 30일(화) ~ 6월 1일(목) / 리뉴얼 공사 이후 콘셉트 변경</p>

<p>- 본 패키지는 2인 기준으로 구성되어 있습니다.</p>
<p>- 본 패키지는 선착순이므로 객실 상황에 따라 조기 마감될 수 있습니다.</p>
<p>- 본 패키지의 혜택, 기간, 요금은 마이다스 사정에 의해 변경될 수 있습니다.</p>
<p>- 본 패키지의 요금은 부가세가 포함된 금액입니다.</p>
<p>- 특별 혜택은 투숙 기간 중 객실 당 1회 제공됩니다.</p>
<p>- 쾌적한 환경을 위해 전 객실 금연실로 운영합니다. (발코니 흡연 제한 포함 / 실외 별도 흡연 공간 마련)</p>
<p>- 예약 취소 및 변경 : 숙박 예정일 1일 전 18시 이후 취소/변경 및 노쇼(No-Show) 발생 시 성수기(연휴 포함)에는 최초 1일 숙박 요금의 100%가</p>

<p>비수기(성수기 외 기간)에는 최초 1일 숙박 요금의 10%가 위약금으로 부과됩니다.</p>

<p>※ 성수기(연휴포함) : 2023년 2월 24일(금) ~ 3월 5일(일), 3월 31일(금) ~ 4월 16일(일), 4월 28일(금) ~ 5월 7일(일), 6월 2일(금) ~ 6일(화)</p>
                    
                </div>
            </div>
        </div>
    );
};

export default SpDetailContainer;