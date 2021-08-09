import React from "react";
import {Typography} from "@material-ui/core";

/**
 * Page Header
 * @returns {JSX.Element} - A header that displays the title and the current date.
 * @constructor
 */
export const Header = () => {
    const today = new Date()
    const day = today.getDate()
    const month = today.getMonth()+1
    const year = today.getFullYear()

    return (
        <div data-testid={"Header"}>
            <Typography variant={"h3"} color={"textPrimary"} align={"center"} gutterBottom>Currency Exchange</Typography>
            <Typography variant={"h5"} color={"textSecondary"} align={"center"} gutterBottom>{day+"/"+month+"/"+year}</Typography>
        </div>
    )
}
