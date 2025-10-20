
/*basetest.extend<{fixture1:any},{fixture2:any}>({


})*/
import { test as basetest } from "@playwright/test";

type myfixtures = {
    fixtur1: any;
    fixture2: any
}
type workerfixture = {

    workerfixture:any
}

export const test=basetest.extend<myfixtures,workerfixture>({

    fixtur1: async ({ }, use: any) => {

        const fixtur1 = "I am a fixture"
        console.log("Before use of fixture1")
        await use(fixtur1)
        console.log("after use of fixture1")
    },

    fixture2: async ({ }, use: any) => {

        const fixture2 = "I am a fixture"
        console.log("Before use of fixture2")
        await use(fixture2)
        console.log("after use of fixture2")
    },

    workerfixture:[async ({ }, use: any) => {

        const workerfixture = "I am a Worker fixture"
        console.log("Before use of workerfixture")
        await use(workerfixture)
        console.log("after use of workerfixture")
    },{scope:"worker"}]


})