class DuplicityError extends Error {
    // constructor function
    constructor(message) {
        super(message)

        //this.name = DuplicityError.name
    }
    // "getter" to set an estatic property of the constructor function of the class
    get name() { return DuplicityError.name }
}

class ContentError extends Error {
    constructor(message) {
        super(message)
    }

    get name() { return ContentError.name }
}

class ExistenceError extends Error {
    constructor(message) {
        super(message)
    }

    get name() { return ExistenceError.name }
}

class AuthError extends Error {
    constructor(message) {
        super(message)
    }

    get name() { return AuthError.name }
}

class UnknownError extends Error {
    constructor(message) {
        super(message)
    }

    get name() { return UnknownError.name }
}

class UploadError extends Error {
    constructor(message) {
        super(message);
    }

    get name() {
        return UploadError.name;
    }
}
class FormatError extends Error {
    constructor(message) {
        super(message);
    }

    get name() {
        return FormatError.name;
    }
}



module.exports = {
    DuplicityError,
    ContentError,
    ExistenceError,
    AuthError,
    UnknownError,
    FormatError,
    UploadError
}