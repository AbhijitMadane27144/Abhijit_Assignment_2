import { test as basetest } from "@playwright/test";
import {AdminPage} from "../Page/AdminLogin";
import{SignUpPage} from "../Page/SignUpPage";
import {AdminProductPage} from "../Page/CreateProductPage"



type myPOMFixture ={
AdminLogin:AdminPage
CreateProduct:AdminProductPage
signupPage:SignUpPage
}

export const test=basetest.extend<myPOMFixture>({
AdminLogin: async({page},use)=>{
const adminlogin=new AdminPage(page)
await use(adminlogin)
},

CreateProduct: async({page},use)=>{
const createproduct=new AdminProductPage(page)
await use(createproduct)
},

signupPage: async({page},use)=>{
const signupPage=new SignUpPage(page)
await use(signupPage)
},


})


