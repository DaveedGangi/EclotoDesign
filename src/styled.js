import  styled from "styled-components";

export const Bar=styled.div`
 background-color:cornflowerblue;
 width:${(props)=>`${props.data/10}%`};
 border-radius:14px;
 height:33px;
 
 
 


`
export const Offer=styled.div`
width:100%;
background-color:#e1dddd;
height:33px;
border-radius:14px;
margin-top:13px;

`