import React from 'react';
import styled from 'styled-components';

const Td = styled.td`
padding: 12px;
text-align: left;
border-bottom: 1px solid #ddd;
`;
export default function Alert({ keyword }) {


    let data = []

    for (let key in keyword) {
        data.push((<Td key={key}>{keyword[key]}</Td>))
    }

    return (
        <tr>
            {data}
        </tr>
    )
}
