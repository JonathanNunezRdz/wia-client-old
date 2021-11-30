import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { signIn } from '../../app/reducers/userSlice';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = () => {
	const dispatch = useAppDispatch();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [validated, setValidated] = useState(false);

	const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
		setEmail(e.target.value);
	const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
		setPassword(e.target.value);
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setValidated(true);
		if (!e.currentTarget.checkValidity()) return;
		dispatch(signIn({ email, password }));
	};

	return (
		<Container>
			<Row>
				<Col xs={12}>
					<Card>
						<Card.Body>
							<Form
								noValidate
								validated={validated}
								onSubmit={handleSubmit}
							>
								<Form.Group>
									<Form.Label>Email</Form.Label>
									<Form.Control
										type='email'
										value={email}
										onChange={handleChangeEmail}
										required
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>Password</Form.Label>
									<Form.Control
										type='password'
										value={password}
										onChange={handleChangePassword}
										required
									/>
								</Form.Group>
								<Button type='submit' variant='outline-primary'>
									Login
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Login;
