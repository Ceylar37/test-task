import React, {ChangeEvent, FormEvent, useRef, useState} from 'react';
import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useDebounce} from "../hooks/useDebounce";

const Header = () => {
    const form = useRef<HTMLFormElement>(null)
    const {pathname} = useLocation()
    const number = useTypedSelector((state) => state.blockReducer.currentBlock?.number)
    const {error} = useTypedSelector((state) => state.blockReducer)
    const navigate = useNavigate()
    const [validated, setValidated] = useState<boolean>(false);
    const [inpValue, setInpValue] = useState<string>('')
    const {isPending} = useTypedSelector((state) => state.blockReducer)
    const [validError, setValidError] = useState<boolean>(false)
    const removeValidError = useDebounce(() => {setValidError(false)}, 2000)
    const handleInpChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInpValue(e.currentTarget.value)
    }
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (!form.checkValidity()) {
            setValidError(true)
            removeValidError()
            setValidated(true);
            return
        }
        setValidated(true);
        const {value} = form[0] as HTMLInputElement
        navigate(`/block/${value}`)
        setInpValue('')
        setValidated(false)
        form.reset()
    };
    const handleLatestButtonClick = () => {
        navigate(`/block/latest`)
        setInpValue('')
        setValidated(false)
        form.current?.reset()
    }
    const handleNextButtonClick = () => {
        if (number) {
            navigate(`block/${+number + 1}`)
            setInpValue('')
            setValidated(false)
            form.current?.reset()
        }
    }
    const handlePreviousButtonClick = () => {
        if (number) {
            navigate(`block/${+number - 1}`)
            setInpValue('')
            setValidError(false)
            setValidated(false)
            form.current?.reset()
        }
    }
    return (
        <header className='header'>
            <Container>
                <Row>
                    <Col>
                        <Form ref={form} noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row>
                                <Col sm='7'>
                                    <Form.Control type="number" min="0" value={inpValue} onChange={handleInpChange} placeholder='Block Number' required disabled={isPending}/>
                                </Col>
                                <Alert variant={'danger'} className={`alert${validError ? ' visible' : ''}`}>
                                    Block number must be non-negative integer
                                </Alert>
                                <Col>
                                    <Button variant='light' type='submit' disabled={isPending}>
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col sm='3'>
                        <Button variant='light' disabled={isPending || pathname === "/block/latest"} onClick={handleLatestButtonClick}>
                            Open Latest
                        </Button>
                    </Col>
                    <Col sm='4'>
                        <Row>
                            <Col sm='2'>
                                <Button variant='light' disabled={isPending || !number || number === '0' || !!error} onClick={handlePreviousButtonClick}>
                                    {'<'}
                                </Button>
                            </Col>
                            <Col>
                                <Button variant='light' disabled={isPending || !number || pathname === "/block/latest" || !!error} onClick={handleNextButtonClick}>
                                    {'>'}
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </header>
    );
};

export default Header;