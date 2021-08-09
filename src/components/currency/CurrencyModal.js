import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CurrencyList from "./CurrencyList";
import PropTypes from "prop-types";
import Modal from "@material-ui/core/Modal";
import React from "react";
import {makeStyles} from "@material-ui/core";

/**
 * Creates styles for CurrencyModal
 * @type {(props?: any) => ClassNameMap<"modal">}
 */
const useStyles = makeStyles((theme) => ({
    modal: {
        display:'flex',
        alignItems:'start',
        justifyContent:'center',
        overflowY:"scroll",
        marginTop:30,
        marginBottom:120,

    },
}))

/**
 * Implementation of the Material-UI Modal
 * @param toggleModal {function} - Toggles the modal on and off
 * @param modalOpen {boolean} - Current state of the modal
 * @returns {JSX.Element}
 * @constructor
 */
export const CurrencyModal = ({toggleModal,modalOpen}) => {
    const classes = useStyles();
    return (
        <Modal
            className={classes.modal}
            open={modalOpen}
            onClose={toggleModal}
            aria-labelledby="Choose Exchange Rates"
            aria-describedby={"Select Exchange Rates"}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 100,
            }}>

            <Fade in={modalOpen}
                  timeout={100}>
                <CurrencyList data-testid={"CurrencyList"}/>
            </Fade>
        </Modal>
    )
}
/**
 * Validation of CurrencyModal props
 * @type {{modalOpen: Validator<NonNullable<boolean>>, toggleModal: Validator<NonNullable<(...args: any[]) => any>>}}
 */
CurrencyModal.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    modalOpen:PropTypes.bool.isRequired,
}
