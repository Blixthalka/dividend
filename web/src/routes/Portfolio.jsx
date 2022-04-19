import React, { useState, useEffect } from 'react';
import Card from '../components/Card'
import { Link } from "react-router-dom";
import { TradeIcon, MinusIcon, FlagIcon } from '../icons/Icons'
import { IconButton, ButtonGroup } from '@chakra-ui/react'
import { Tooltip } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure
} from '@chakra-ui/react'

import TradeModal from '../components/TradeModal'

const Intruments = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        fetch("/api/positions")
            .then(i => i.json())
            .then(i => {
                setPositions(i)
            })
    }, [])

    return (
        <div>
            <TradeModal isOpen={isOpen} onClose={onClose} instrumentId={1} />

            <div className="grid gap-5 max-w-4xl py-5 mx-auto text-primary">
                <Card title={"Positions"} className="grid gap-2">
                    {positions.map((position) => (
                        <div className="flex justify-between bg-gray-100 p-2 rounded ">
                            <div className="flex space-x-2 items-center">
                                <FlagIcon code={position.instrument.currency} />
                                <p>{position.instrument.name}</p>
                            </div>

                            <div className="flex items-center space-x-5">
                                <p>{position.quantity + ' shares'}</p>
                                <Tooltip label="Trade" bg="teal.900">
                                    <IconButton size='sm' aria-label='Increase position' onClick={() => {onOpen()}} icon={<TradeIcon className="fill-primary" />} />
                                </Tooltip>
                            </div>
                        </div>
                    ))}
                </Card>
            </div>
        </div>
    );
}

export default Intruments;
