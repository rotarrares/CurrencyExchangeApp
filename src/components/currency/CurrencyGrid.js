import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Grid, makeStyles} from '@material-ui/core'
import CurrencyCard from "./CurrencyCard";

/**
 * Creates Styles for the Currency Grid
 * @type {(props?: any) => ClassNameMap<"currencyListFix">}
 */
const useStyles = makeStyles(theme => ({
    currencyListFix:{
        maxWidth:'100vw',
        margin:'0px',
        padding:'50px 0px 100px 0px',
    }
}))


/**
 * A grid of selected currency cards
 * @param selectedCurrency {Currency[]} - Takes a list of selected currencies from the store
 * @returns {JSX.Element}
 * @constructor
 */
const CurrencyGrid = ({selectedCurrency,modalOpen}) => {
    const classes = useStyles()
    const [selectedCurrencyProp, setSelectedCurrencyProp] = useState(selectedCurrency)


    useEffect(()=>{
        if(!modalOpen){
            setSelectedCurrencyProp(selectedCurrency)
        }
    },[selectedCurrency])



    return (
        <Grid data-testid={"CurrencyGrid"} className={classes.currencyListFix} spacing={3} container>

         {selectedCurrencyProp.map((currency) =>(
                <Grid xs={12} sm={6} md={4} xl={3} item key={currency.symbol}>
                    <CurrencyCard currency={currency}/>
                </Grid>)
             )}
        </Grid>
    )
}

/**
 * Validation of props for Currency Grid
 * @type {{selectedCurrency: Validator<NonNullable<any[]>>}}
 */
CurrencyGrid.propTypes = {
    selectedCurrency: PropTypes.array.isRequired,
    modalOpen: PropTypes.bool.isRequired,
};

/**
 * Mapping state to CurrencyGrid Props
 * @param state
 * @returns {{selectedCurrency: Validator<NonNullable<any[]>> | (function(*=, *): (*[]|{rate: *}[])) | Validator<NonNullable<*[]>>}}
 */
const mapStateToProps = (state) => {
    return {
        selectedCurrency: state.selectedCurrency,
    };
};


export default connect(mapStateToProps)(CurrencyGrid);
