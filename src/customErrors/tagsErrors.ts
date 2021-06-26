import { DomainError } from './DomainError'

class ExistingTagError extends DomainError {

    constructor(message: string = '') {
        
        const errorMessage = message !== '' ? message : 'Error! This tag is already exists!' 

        super(errorMessage)
    }
}

class AuthenticateError extends DomainError {

    constructor(message: string = '') {

        const errorMessage = message !== '' ? message : 'Error! Invalid credentials!'

        super(errorMessage)
    }
}

export { ExistingTagError, AuthenticateError }
