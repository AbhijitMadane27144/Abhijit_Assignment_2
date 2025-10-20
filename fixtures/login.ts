import { test as basetest } from "@playwright/test"


/*export const testfixture = basetest.extend({
  // login fixture
  loginpage: async ({}, use) => {
    const loginpage = 'I am a fixture';
    console.log('Login Fixture script is here');
    await use(loginpage);
  },

  // logout fixture
  logoutpage: async ({}, use) => {
    const logoutpage = 'Logout logic here';
    console.log('Logout Fixture script is here');
    await use(logoutpage);
  },
});










/*basetest.extend<{loginpage:any}>({

    loginpage:async({},use:any)=>{

        const loginpage="i am a fixture"
        // code start from here
        console.log("Fixture script is here")

        await use(loginpage)
    }

}

)*/


