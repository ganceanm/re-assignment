import React, { useState } from "react";
import { Alert } from "../modal/Alert";

const WithAlert = (Component) => {
    const Wrapper = () => {
        const [alertKey, setAlertKey] = useState(false);
        const [alertVisible, setAlertVisible] = useState(false);

        const showAlert = (key) => {
            setAlertKey(key);
            setAlertVisible(true);
        }

        const hideAlert = () => {
            setAlertVisible(false)
        }

        return (
            <div>
                <Component showAlert={showAlert} />
                <Alert open={alertVisible} alertKey={alertKey} onClose={hideAlert} />
            </div>
        )
    }

    return Wrapper

};

export default WithAlert;