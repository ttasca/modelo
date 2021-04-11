class AppError{
    public readonly message: string; // se tiver readonly não consigo setar na mão a mensagem. 

    public readonly statusCode: number;

    constructor(message: string, statusCode = 400){
        this.message = message;
        this.statusCode = statusCode;
    }
}

export default AppError;