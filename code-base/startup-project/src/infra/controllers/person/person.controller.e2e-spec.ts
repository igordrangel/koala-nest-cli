import { createE2ETestApp } from '@/test/create-e2e-test-app'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { PERSON_ROUTER_CONFIG } from './router.config'

describe(`CRUD OF PERSON`, () => {
  let app: INestApplication
  let personId: number

  beforeAll(async () => {
    app = await createE2ETestApp()
  })

  it('should create a person', async () => {
    const response = await request(app.getHttpServer())
      .post(PERSON_ROUTER_CONFIG.group)
      .send({
        name: 'John Doe',
        phones: []
      })
    
    personId = response.body.id

    expect(response.statusCode).toBe(201)
    expect(response.body).toStrictEqual({
      id: expect.any(Number)
    })
  })

  it('should get the created person', async () => {
    const response = await request(app.getHttpServer())
      .get(`${PERSON_ROUTER_CONFIG.group}/${personId}`)
    
    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual({
      id: personId,
      name: 'John Doe',
      phones: [],
      status: 'active'
    })
  })

  it('should get all persons', async () => {
    const response = await request(app.getHttpServer())
      .get(PERSON_ROUTER_CONFIG.group)
    
    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual({
      items: [{
        id: personId,
        name: 'John Doe',
        phones: [],
        status: 'active'
      }],
      count: 1
    })
  })

  it('should get all inactive persons', async () => {
    const response = await request(app.getHttpServer())
      .get(`${PERSON_ROUTER_CONFIG.group}?active=false`)
    
    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual({
      items: [],
      count: 0
    })
  })

  it('should get persons by name', async () => {
    const response = await request(app.getHttpServer())
      .get(`${PERSON_ROUTER_CONFIG.group}?name=John`)
    
    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual({
      items: [{
        id: personId,
        name: 'John Doe',
        phones: [],
        status: 'active'
      }],
      count: 1
    })
  })

  it('should update the created person', async () => {
    const updateResponse = await request(app.getHttpServer())
      .put(`${PERSON_ROUTER_CONFIG.group}/${personId}`)
      .send({
        name: 'John Doe Updated',
        phones: [],
        status: 'active'
      })
    
    expect(updateResponse.statusCode).toBe(200)

    const response = await request(app.getHttpServer())
      .get(`${PERSON_ROUTER_CONFIG.group}/${personId}`)
    
    expect(response.body).toStrictEqual({
      id: personId,
      name: 'John Doe Updated',
      phones: [],
      status: 'active'
    })
  })

  it('should delete the created person', async () => {
    const deleteResponse = await request(app.getHttpServer())
      .delete(`${PERSON_ROUTER_CONFIG.group}/${personId}`)
    
    expect(deleteResponse).toBeTruthy()
    expect(deleteResponse.statusCode).toBe(204)

    const response = await request(app.getHttpServer())
      .get(`${PERSON_ROUTER_CONFIG.group}/${personId}`)
    
    expect(response.statusCode).toBe(404)
  })
})