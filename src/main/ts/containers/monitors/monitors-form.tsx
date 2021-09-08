import React, {FunctionComponent, useState} from 'react';
import CronParser from 'cron-parser';
import Headline from "@components/headline";
import Form, {ISelectItem} from "@components/form";
import UI from "@components/ui";
import Button from '@components/button'
import {useTranslation} from "react-i18next";
import {gql, useMutation} from "@apollo/client";
import {useHistory} from "react-router-dom";

const getCronDescription = (cron: string) => {
    try {
        return CronParser.parseExpression(cron).next().toString();
    } catch (e) {
        console.error("Failed to parse cron", e);
        return null;
    }
}

const CREATE_MONITOR_MUTATION = gql`
mutation createMonitor($name: String, $target: String, $cron: String, $statusCode: Int!, $type: String, $expression: String, $value: String) {
  createMonitor(monitor: {
    name: $name
    target: $target
    cron: $cron
    owner: null
    id: null
    status: null
    check: {
        statusCode: $statusCode
        type: $type
        expression: $expression
        value: $value
    }
  }) {
    id
  }
}
`
const MonitorsForm: FunctionComponent = () => {
    const {t} = useTranslation();

    const contentCheckTypes: ISelectItem[] = [
        {label: t('monitors.form.settings.content_check_type.null'), value: null, disabled: false},
        {label: t('monitors.form.settings.content_check_type.json'), value: 'json', disabled: false},
        {label: t('monitors.form.settings.content_check_type.xml'), value: 'xml', disabled: false}
    ];

    const [name, setName] = useState('');
    const [target, setTarget] = useState('https://');
    const [cron, setCron] = useState('0 0/1 * 1/1 * ?');
    const [cronDescription, setCronDescription] = useState(getCronDescription(cron));
    const [statusCode, setStatusCode] = useState(200);
    const [contentTypeCheck, setContentTypeCheck] = useState(contentCheckTypes[0]);
    const [contentCheckExpression, setContentCheckExpression] = useState('');
    const [contentValue, setContentValue] = useState('');
    const [addMonitor] = useMutation(CREATE_MONITOR_MUTATION);

    const history = useHistory();

    const handleCron = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCron(e.target.value);
        setCronDescription(getCronDescription(cron));
    }

    const validForm = name.trim().length > 0 && target.trim().length > 0 && cronDescription !== null;

    const createMonitorHandler = (e: any) => {
        e.preventDefault();
        addMonitor({
            variables: {
                name,
                target,
                cron,
                statusCode,
                type: contentTypeCheck.value,
                expression: contentCheckExpression,
                value: contentValue
            }
        }).then(() => {
            history.push('/monitors')
        }).catch(function (error) {
            if (error.graphQLErrors[0].extensions.code === 'invalid-cron-exception') {
                setCronDescription(null);
            }
        });
    }

    return (
        <form className="w-3/4 mx-auto" onSubmit={createMonitorHandler}>
            <Headline.Title label={t("monitors.create")}/>
            <Headline.Subtitle label={t("monitors.details")} className="mb-0"/>
            <Form.Section className="mt-0">
                <Form.Column size="2/5" className="mr-6 py-8">
                    <div dangerouslySetInnerHTML={{__html: t('monitors.form.details')}}/>
                </Form.Column>
                <Form.Column size="3/5">
                    <UI.Shadow className="p-8">
                        <div className="mb-4">
                            <Form.Input label={t('monitors.form.name')} type="text" name="name" value={name}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                        required={true}/>
                        </div>
                        <div className="mb-4">
                            <Form.Input label={t('monitors.form.target')} type="url" name="target" value={target}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTarget(e.target.value)}
                                        required={true}/>
                        </div>
                        <div>
                            <Form.Input label={t("monitors.form.cron")} type="text" name="cron" value={cron}
                                        description={cronDescription === null ? t('monitors.form.cron-description-error') : t('monitors.form.cron-description', {date: cronDescription})}
                                        onChange={handleCron} required={true} error={cronDescription === null}/>
                        </div>
                    </UI.Shadow>
                </Form.Column>
            </Form.Section>
            <Headline.Subtitle label={t("monitors.form.settings.advanced")} className="mb-0"/>
            <Form.Section className="mt-0">
                <Form.Column size="2/5" className="mr-6 py-8">
                    <div dangerouslySetInnerHTML={{__html: t('monitors.form.settings.details')}}/>
                </Form.Column>
                <Form.Column size="3/5">
                    <UI.Shadow className="p-8">
                        <div className="mb-4">
                            <Form.Input label={t('monitors.form.settings.status_code')} type="number" name="status_code"
                                        value={statusCode}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStatusCode(parseInt(e.target.value))}
                                        required={true}/>
                        </div>
                        <div className="mb-4">
                            <Form.Select label={t('monitors.form.settings.content_check_type.label')}
                                         items={contentCheckTypes}
                                         selected={contentTypeCheck} onChange={(item: ISelectItem) => {
                                setContentTypeCheck(item);
                                if (item.value === null) setContentCheckExpression('');
                            }}
                            />
                        </div>
                        <div className="mb-4">
                            <Form.Input label={t('monitors.form.settings.content_check_type.expression')} type="text"
                                        name="content_check_expression"
                                        value={contentCheckExpression}
                                        disabled={contentTypeCheck.value === null}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContentCheckExpression(e.target.value)}/>
                        </div>
                        <div className="mb-4">
                            <Form.Input label={t('monitors.form.settings.content_check_type.content')} type="text"
                                        name="content"
                                        value={contentValue}
                                        disabled={contentTypeCheck.value === null}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContentValue(e.target.value)}/>
                        </div>
                    </UI.Shadow>
                </Form.Column>
            </Form.Section>
            <div className="mt-6 flex justify-end">
                <Button.Primary label={t("monitors.create")} disabled={!validForm}/>
            </div>
        </form>
    )
}

export default MonitorsForm;