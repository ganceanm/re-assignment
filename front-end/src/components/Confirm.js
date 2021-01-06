import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { IconButton } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Confirm(props) {
    const { confirm, content, icon } = props;

    const [open, setOpen] = useState(false)

    const doConfirm = () => {
        setOpen(true)
    }

    const confirmResult = (result) => {
        setOpen(false)
        if (result) {
            confirm()
        }
    }

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Figyelem!</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Biztosan végrehajtja a műveletet?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => confirmResult(false)} color="primary">
                        Nem
                </Button>
                    <Button onClick={() => confirmResult(true)} color="primary">
                        Igen
                </Button>
                </DialogActions>
            </Dialog>
            {icon ?
                <IconButton onClick={doConfirm}>
                    {content}
                </IconButton>
                :
                <Button onClick={doConfirm} variant="contained" color="primary">
                    {content}
                </Button>
            }

        </div>
    );
}