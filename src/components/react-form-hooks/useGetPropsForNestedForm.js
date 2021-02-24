import { useCallback } from 'react';
import { buildEventMetadata } from './useGetPropsForField';
import { getField } from './schemaUtils';

/**
 * Similar to `useController` for to generate the props for a nested form.
 *
 * @param {Object} props - Form props.
 * @returns {Object} Props for nested form `useController` hooke.
 */
export const useGetPropsForNestedForm = ({
    schema,
    values,
    touched,
    visited,
    validationResult,
    onChange,
    onSubmit,
    onFieldTouchedChange,
    onFieldVisitedChange,
}) => {
    const makeValuesStateUpdater = useCallback(([name, form]) => (reducer, nestedFormEvent) => onChange(
        buildEventMetadata(values, validationResult, name, form, nestedFormEvent),
        (values) => ({ ...values, [name]: reducer(values[name]) }),
    ), [values, validationResult, onChange]);
    const makeTouchedStateUpdater = useCallback(([name, form]) => (reducer, nestedFormEvent) => onFieldTouchedChange(
        buildEventMetadata(values, validationResult, name, form, nestedFormEvent),
        (touched) => ({ ...touched, [name]: reducer(touched[name]) }),
    ), [onFieldTouchedChange, validationResult, values]);
    const makeVisitedStateUpdater = useCallback(([name, form]) => (reducer, nestedFormEvent) => onFieldVisitedChange(
        buildEventMetadata(values, validationResult, name, form, nestedFormEvent),
        (visited) => ({ ...visited, [name]: reducer(visited[name]) }),
    ), [onFieldVisitedChange, validationResult, values]);

    return useCallback((name) => {
        const form = getField(schema, name);

        return {
            schema: form,
            initialValues: values[name],
            valuesStateHook: [values[name], makeValuesStateUpdater([name, form]), true],
            touchedStateHook: [touched[name], makeTouchedStateUpdater([name, form]), true],
            visitedStateHook: [visited[name], makeVisitedStateUpdater([name, form]), true],
            validationResult: validationResult[1][name],
            onSubmit,
        };
    }, [
        schema,
        values,
        makeValuesStateUpdater,
        touched,
        makeTouchedStateUpdater,
        visited,
        makeVisitedStateUpdater,
        validationResult,
        onSubmit,
    ]);
};

export default useGetPropsForNestedForm;
