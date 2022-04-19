import React, { useState, useEffect } from 'react';
import Card from '../components/Card'
import { Link } from "react-router-dom";
import { TradeIcon, MinusIcon, FlagIcon } from '../icons/Icons'
import { IconButton, ButtonGroup, FormControl, Stack } from '@chakra-ui/react'
import { Tooltip } from '@chakra-ui/react'

import { formatDateInput } from "../utils/util"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
} from '@chakra-ui/react'

import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    FormLabel,
    FormHelperText,
    Input,
    RadioGroup,
    Radio,
} from '@chakra-ui/react'

const TradeModal = ({ isOpen, onClose, instrumentId }) => {
    const [date, setDate] = useState(formatDateInput(new Date()))
    const [quantity, setQuantity] = useState("")
    const [type, setType] = useState('BUY')

    console.log(date)

    const submit = () => {
        fetch("/api/transactions", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    type: type,
                    instrumentId: instrumentId,
                    quantity: quantity,
                    date: date,
                }
            )
        }).then(i => {
            onClose()
        })

    }


    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="text-primary">Create Trade</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={4}>
                            <FormControl>
                                <FormLabel>Quantity</FormLabel>
                                <NumberInput min={0}>
                                    <NumberInputField placeholder={1000} value={quantity} onChange={(v) => setQuantity(v.target.value)} />
                                </NumberInput>
                                <FormHelperText>How many shares you to bought/sold.</FormHelperText>
                            </FormControl>
                            <RadioGroup colorScheme='teal' value={type} onChange={setType} >
                                <Stack direction='row'>
                                    <Radio value='BUY'>Buy</Radio>
                                    <Radio value='SELL'>Sell</Radio>
                                </Stack>
                            </RadioGroup>

                            <FormControl>
                                <FormLabel>Date</FormLabel>
                                <Input value={date} onChange={(v) => {
                                    setDate(v.target.value);
                                }} />
                            </FormControl>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='teal' mr={3} onClick={submit}>
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default TradeModal;
