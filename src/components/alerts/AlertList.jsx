import React from 'react'
import styled from 'styled-components';
import Alert from './Alert';

const Table = styled.table`
width: 100%;
border-collapse: collapse;
border-spacing: 0;
`;

const Th = styled.th`
padding: 12px;
text-align: left;
border-bottom: 1px solid #ddd;
background-color: #008549;
color: #fff;
`;


function AlertList({ data }) {

    function generateRows(){
        let rows = data.map((d,i) => <Alert keyword={d} key={i} />)
        return rows;
    }
    return (
        <Table>
            <thead>
                <tr>
                    <Th>Search Query</Th>
                    <Th>Start</Th>
                    <Th>Now</Th>
                    <Th>Change</Th>
                </tr>
            </thead>
            <tbody>
                {generateRows()}
            </tbody>
        </Table>
    )
}

export default AlertList
