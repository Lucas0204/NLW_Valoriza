import { DomainError } from './DomainError'

class AuthenticateError extends DomainError {

    constructor(message: string = '') {

        const errorMessage = message !== '' ? message : 'Error! Verification failure! Make sure the fields are filled in correctly'

        super(errorMessage)
    }
}

export { AuthenticateError }
