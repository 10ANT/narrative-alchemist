'use client'
import PasswordFormInput from '@/components/form/PasswordFormInput'
import TextFormInput from '@/components/form/TextFormInput'
import { Button } from 'react-bootstrap'
import useSignIn from './useSignIn'

const LoginForm = () => {
    const { loading, login, control } = useSignIn()

    return (
        <>
            <form onSubmit={login} className="text-start mb-3">
                <div className="mb-3">
                    <TextFormInput control={control} name="email" label="Email" containerClassName="form-group mb-2" placeholder="Enter your email" />
                </div>

                <div className="mb-3">
                    <PasswordFormInput control={control} name="password" label="Password" containerClassName="form-group" placeholder="Enter your password" />
                </div>
                <div className="d-flex justify-content-between mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="checkbox-signin"
                        />
                        <label className="form-check-label" htmlFor="checkbox-signin">
                            Remember me
                        </label>
                    </div>
                    <a
                        href="/auth/recover-password"
                        className="text-muted border-bottom border-dashed"
                    >
                        Forget Password
                    </a>
                </div>
                <div className="d-grid">
                    <Button variant="primary" className="fw-semibold" type="submit" disabled={loading}>
                        Login
                    </Button>
                </div>
            </form>
        </>
    )
}

export default LoginForm