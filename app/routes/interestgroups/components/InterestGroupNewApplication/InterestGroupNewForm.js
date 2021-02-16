// @flow

import React from 'react';
import { Field } from 'redux-form';
import Button from 'app/components/Button';
import { createValidator, required } from 'app/utils/validation';

import {
  Form,
  TextInput,
  TextArea,
  Captcha,
} from 'app/components/Form';

import legoForm from '../../../../components/Form/legoForm';


type Props = {
    loggedIn: Boolean,
    requestNewInterestGroup: (form: any) => Promise<*>    //SHOULDN'T BE ANY
} & FormProps;

const validate = createValidator({
    captchaResponse: [required('Captcha er ikke validert')],
  });


const InterestGroupNewForm = (props: Props) => {   
    const { invalid, pristine, submitting } = props;
    const disabledButton = invalid || pristine || submitting;

    function onSubmit(data) {
        return props.requestNewInterestGroup(data);
    }

    return (
        <Form onSubmit={props.handleSubmit(onSubmit)}>
            <Field
                placeholder="Abagruppenavn"
                label="Navn på interessegruppe"
                name="group_name"
                component={TextInput.Field}
            />

            <Field
                placeholder="Ababeskrivelse"
                label="Beskrivelse"
                name="description"
                component={TextArea.Field}
            />  
            
            <Field
                name="captchaResponse"
                fieldStyle={{ width: 304}}
                component={Captcha.Field}
            />

            <Button disabled={disabledButton} submit>
                Send
            </Button>       
        </Form>
    )
}

// Wraps redux-form as legoForm
export default legoForm({form: 'newInterestGroupForm',
                         validate: validate })(InterestGroupNewForm);