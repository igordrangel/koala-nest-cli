import { CreatePersonHandler } from '@/application/person/create/create-person.handler'
import { CreatePersonRequest } from '@/application/person/create/create-person.request'
import { CreatePersonResponse } from '@/application/person/create/create-person.response'
import { IController } from '@koalarx/nest/core/controllers/base.controller'
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { PERSON_ROUTER_CONFIG } from './router.config'

@ApiTags(PERSON_ROUTER_CONFIG.tag)
@Controller(PERSON_ROUTER_CONFIG.group)
export class CreatePersonController
  implements IController<CreatePersonRequest, CreatePersonResponse>
{
  constructor(private readonly handler: CreatePersonHandler) {}

  @Post()
  @ApiCreatedResponse({ type: CreatePersonResponse })
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @Body() request: CreatePersonRequest,
  ): Promise<CreatePersonResponse> {
    const response = await this.handler.handle(request)

    if (response.isFailure()) {
      throw response.value
    }

    return response.value
  }
}
