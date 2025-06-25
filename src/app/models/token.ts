export class Token {
    jwtToken: string;
    authorities: string;
    userId: number;

    constructor(jwtToken: string, authorities: string, userId: number) {
        this.jwtToken = jwtToken;
        this.authorities = authorities;
        this.userId = userId;
    }
}