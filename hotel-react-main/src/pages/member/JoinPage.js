import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PopupDom from '../../components/PopupDom';
import PopupPostCode from '../../components/PopupPostCode';
import Title from '../../components/Title';
import { API_URL } from '../../config/apiurl';
import { setMenu } from '../../modules/logincheck';
import './JoinPage.css';
const JoinPage = () => {
    
    const navigate = useNavigate();
    const [formData, setFormData ] = useState({
        m_name: "",
        m_pass: "",
        m_passch: "",
        m_nickname: "",
        m_email: "",
        m_phone: "",
        m_add1: "",
        m_add2: ""
    });
    const dispatch = useDispatch();
    dispatch(setMenu(false))
    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    // 팝업창 상태관리
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    // 팝업창 열기
    const openPostCode = () => {
        setIsPopupOpen(true)
    }
    // 팝업창 닫기
    const closePostCode = () => {
        setIsPopupOpen(false)
    }
    // 주소 넣기
    const onAddData = (data) => {
        console.log(data);
        setFormData({
            ...formData,
            m_add1: data.address
        })
    }
    //폼전송 이벤트 
    const regexEmail = new RegExp("[a-z0-9]+@[a-z]+\.[a-z]{2,3}");
    //숫자, 특문 각 1회 이상, 영문은 2개 이상 사용하여 8자리 이상 16자리 이하입력
    const regexPass = /(?=.*\d{1,16})(?=.*[~`!@#$%\^&*()-+=]{1,16})(?=.*[a-zA-Z]{2,16}).{8,16}$/;
    const regexPhone= new RegExp("^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$");
    const onSubmit = (e) => {
        e.preventDefault();
        //입력이 다 되어있는지 체크하고 
        if(formData.m_name !== "" && formData.m_pass !== "" && formData.m_phone !== "" 
        && formData.m_add1 !== "" && formData.m_add2 !== "" && formData.m_email !== "" ){
            //이메일 형식 체크 하기
            if(!regexEmail.test(formData.m_email)){
                alert("이메일을 정확하게 작성해 주세요") 
            }
            else { 
                //비밀번호 형식 체크 
                if(!regexPass.test(formData.m_pass)){
                    console.log(formData.m_pass)
                    alert("비밀번호는 최소 8 자, 하나 이상의 문자와 하나의 숫자로 입력하셔야 합니다.")
                }
                else {
                    //비밀번호와 비밀번호 체크 일치하는지 체크
                    if(formData.m_pass !== formData.m_passch){
                        alert("비밀번호와 비밀번호체크가 일치하지 않습니다.")
                    }   
                    else {
                        //전화번호 형식 체크 
                        if(!regexPhone.test(formData.m_phone)){
                            alert("전화번호는 숫자와 하이픈만 입력할 수 있습니다.")
                        }
                        else {
                            addMember();
                        }
                    }   
                }
            }
        }else {
            alert("모든 항목을 작성해야 합니다.")
        }
    }
    const addMember = () => {
        console.log("호출");
        axios.post(`${API_URL}/join`, formData)
        .then(res=> {
            alert('등록되었습니다.');
            navigate('/');
        })
        .catch(e=>{
            console.log("에러가 발생했어요")
            console.log(e);
        })
    }
    return (
        <div className='inner'>
            <Title title="Join"/>
            <div>
                <form onSubmit={onSubmit}>
                    <table className='defaulttable'>
                        <tbody>
                            <tr>
                                <td>이름</td>
                                <td><input type="text" 
                                name="m_name" value={formData.m_name} 
                                onChange={onChange} /></td>
                            </tr>
                            <tr>
                                <td>이메일주소(아이디)</td>
                                <td><input type="text" 
                                name="m_email" value={formData.m_email} 
                                onChange={onChange} /></td>
                            </tr>
                            <tr>
                                <td>비밀번호</td>
                                <td>
                                * 숫자, 특문 각 1회 이상, 영문은 2개 이상 사용하여 8자리 이상 16자리 이하입력해주세요
                                    <input type="password" 
                                name="m_pass" value={formData.m_pass} 
                                onChange={onChange} /></td>
                            </tr>
                            <tr>
                                <td>비밀번호 체크</td>
                                <td><input type="password"
                                name="m_passch" value={formData.m_passch} 
                                onChange={onChange} /></td>
                            </tr>
                            <tr>
                                <td>별명</td>
                                <td><input type="text"
                                name="m_nickname" value={formData.m_nickname} 
                                onChange={onChange} /></td>
                            </tr>
                            <tr>
                                <td>전화번호</td>
                                <td><input type="text"
                                name="m_phone" value={formData.m_phone} 
                                onChange={onChange} /></td>
                            </tr>
                            <tr>
                                <td>주소</td>
                                <td><input type="text"
                                name="m_add1" value={formData.m_add1} 
                                onChange={onChange} />
                                <input type="text"
                                name="m_add2" value={formData.m_add2} 
                                onChange={onChange} />
                                <button onClick={openPostCode}>우편번호 검색</button>
                                <div id="popupDom">
                                    {isPopupOpen && (
                                        <PopupDom>
                                            <PopupPostCode onClose={closePostCode}
                                            onAddData={onAddData} />
                                        </PopupDom>
                                    )}
                                </div>
                                </td>
                            </tr>
                            <tr>
                               <td colSpan={2}>
                                <button type="submit">등록</button>
                                <button type="reset">취소</button>
                               </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
};

export default JoinPage;