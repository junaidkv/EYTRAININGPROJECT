import { address } from "./address.model";
import { gender } from "./gender.model";

export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string
    mobile: number
    profileImageUrl: string
    genderId: string
    gender: gender
    address: address
}

