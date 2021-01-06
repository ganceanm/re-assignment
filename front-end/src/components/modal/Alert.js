import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import getAlert from '../../constants/alertKeys';

export function Alert(props) {
    const { open, alertKey, onClose } = props;

    const alertItem = getAlert(alertKey)

    return (
        <Snackbar open={open}
            autoHideDuration={6000}
            onClose={onClose}>
            <MuiAlert elevation={6}
                variant="filled"
                severity={alertItem && alertItem.severity ? alertItem.severity : "error"}
                onClose={onClose}>
                {alertItem.text}
            </MuiAlert>
        </Snackbar>
    )
}