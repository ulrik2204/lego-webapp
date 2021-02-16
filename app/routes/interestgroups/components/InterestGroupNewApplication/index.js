import React from 'react';

import { Content } from 'app/components/Content';
import InterestGroupNewForm from './InterestGroupNewForm';


const InterestGroupNewApplication = (props) => {
    
    return (
        <Content>
            <h1>Søknadsskjema for Opprettelse av Interessegruppe</h1>
            <InterestGroupNewForm {...props}/>
        </Content>
    );
}

export default InterestGroupNewApplication;