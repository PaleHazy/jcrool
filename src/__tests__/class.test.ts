import {Jcrool} from '..';
import gme from './Mocks/gme.json';
const data = {
    hello: "hi there sir",
    tood: 42,
    chin: {
        hello: "oiiii"
    }
}

describe("jcrool testing", () => {
    test("it loops through large set without fail", () => {
        const j = new Jcrool(data);
        const res = j.find({keys: ["hello", "tood"], types: ["string", "number"]});
        const x = new Jcrool(gme);
        const resx = x.find({keys: ["description", "url", "body"], types: ["string", "number"]});
        expect(res.length).toBe(2);
        expect(resx.length).toBe(3);
        expect(true).toBe(true);
    })
})