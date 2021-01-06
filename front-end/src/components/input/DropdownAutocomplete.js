import React, { useEffect, useState } from 'react';
import { Autocomplete } from "@material-ui/lab";
import { makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    iconButton: {
        color: theme.palette.primary.contrastText,
        marginLeft: theme.spacing(3)
    },
    selectorControl: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        flex: 1,
        margin: theme.spacing(1),
        // marginTop: theme.spacing(2),
        minWidth: 140,
    },
    selector: {
        marginTop: theme.spacing(2),
    },
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 10,
            fontSize: 18,
        },
    }
}))

export default function DropdownAutocomplete(props) {
    const classes = useStyles();

    const { values, defval, label, error, helpertext, onChange, id, style, disabled } = props;

    const [options, setOptions] = useState([])
    const [value, setValue] = useState()

    const getOptionLabel = (option) => {
        return option.display ? option.display : option.value
    }

    const handleChange = (event, val) => {
        event.preventDefault();
        onChange({
            target: {
                value: val.value,
                id: id
            }
        })
        setValue(val)
    }

    useEffect(() => {
        setOptions(values)
    }, [values])

    return (
        <Autocomplete
            options={options}
            className={style ? [style, classes.selectorControl] : classes.selectorControl}
            classes={{
                option: classes.option,
            }}
            defaultValue={defval}
            getOptionLabel={getOptionLabel}
            onChange={handleChange}
            autoHighlight
            disableClearable
            value={value}
            disabled={disabled}
            renderInput={params => (
                <TextField
                    {...params}
                    label={label}
                    error={error}
                    helperText={helpertext}
                    variant="outlined"
                    required
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password',
                    }}
                />
            )}
        />
    );
}