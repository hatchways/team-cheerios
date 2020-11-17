import React from 'react';
import {UserContext} from "../../contexts/UserContext"
import {Dialog, DialogContent, DialogTitle} from "@material-ui/core"

export default function Profile (){
    //const {state,dispatch} = React.useContext(UserContext);
    return (
        <div>
            <Dialog>
                <DialogTitle>
                    Profile Options
                </DialogTitle>
                <DialogContent>
                    Profile
                </DialogContent>

            </Dialog>

        </div>
    );
}
