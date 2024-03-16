import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import '../css/incomeTaxStyles.css';
import Modal from 'react-bootstrap/Modal';
const rmWhitespace = /\s/g;

export function IncomeTax(props) {

    const payIncomeTax = (taxAmount) => {
        return props.onHide (props.activePlayer.cash - taxAmount);
      };

    const calculateTenPercent = () => {
        if (props.activePlayer) {
            return parseInt (props.activePlayer.cash * .10);
        }
      };


console.log(props)
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
          Income Tax
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Taxes are due!!</h4>
          <p>
           Choose wether you want to pay 10% of your total cash or a flat fee of $200.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <div className='button-container'>
            <Button variant='danger' onClick={() => payIncomeTax (calculateTenPercent ())}>{`Pay 10% ($${calculateTenPercent ()})`}</Button>
            <Button variant='danger' onClick={() => payIncomeTax (200)}>Pay $200</Button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
