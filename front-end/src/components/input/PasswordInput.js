import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { InputAdornment, FormControl, InputLabel, OutlinedInput, FormHelperText } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export default function PasswordInput(props) {
    const { label, error, helpertext, wrapperclassname } = props;
    const [visible, setVisible] = useState(false)

    return (
        <FormControl variant="outlined" autoComplete='off' fullWidth className={wrapperclassname}>
            <InputLabel error={error}>{label}</InputLabel>
            <OutlinedInput
                type={visible ? 'text' : 'password'}
                autoComplete='off'
                variant="outlined"
                required
                fullWidth
                {...props}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={() => setVisible(!visible)}
                        >
                            {visible ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            {helpertext && <FormHelperText error={error}>{helpertext}</FormHelperText>}
        </FormControl>
    );
}