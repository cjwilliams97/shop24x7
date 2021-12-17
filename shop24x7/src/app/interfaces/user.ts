export interface User {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    roleId: string,
    phone: number,
    interests: string,
    address: [string, string, string, number]
}