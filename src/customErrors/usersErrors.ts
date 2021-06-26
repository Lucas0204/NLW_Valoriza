import { DomainError } from './createDomainError'

class ExistingUserError extends DomainError {

    constructor(message: string = '') {

        const errorMessage = message !== '' ? message : 'User is already exists!'

        super(errorMessage)
    }
}

class AuthenticateError extends DomainError {

    constructor(message: string = '') {

        const errorMessage = message ? message : 'Error! Email or Password incorrect'

        super(errorMessage)
    }
}

export { ExistingUserError, AuthenticateError }
