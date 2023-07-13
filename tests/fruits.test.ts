import supertest from "supertest";
import app from "../src";

const api = supertest(app);

describe("Testes para o projeto feirinha da Dona Marlene", () => {

    const body = {
        name: "Caju",
        price: 5
    }

    it("should return 201 when inserting a fruit", async () => {
        const {status} = await api.post("/fruits").send(body);
        expect(status).toBe(201);
    });

    it("should return 409 when inserting a fruit that is already registered", async () => {
        const {status} = await api.post("/fruits").send(body);
        expect(status).toBe(409);
    });

    it("should return 422 when inserting a fruit with data missing", async () => {
        const {status} = await api.post("/fruits").send({
        });
        expect(status).toBe(422);
    })

    it("shoud return 404 when trying to get a fruit that doesn't exists", async () => {
        const {status} = await api.get("/fruits/2");
        expect(status).toBe(404);
    })

    it("should return 400 when id param is not valid", async () => {
        const {status} = await api.get("/fruits/-1");
        expect(status).toBe(400);
    })

    it("should return a fruit given an id", async () => {
        const {status, body} = await api.get("/fruits/1");
        expect(status).toBe(200);
        expect(body).toEqual({...body, id: 1});
    })

    it("should return all fruits", async () => {
        const {status, body} = await api.get("/fruits");
        expect(status).toBe(200);
        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: 1,
                    name: "Caju",
                    price: 5                    
                })
            ])
        );
    })
    

});