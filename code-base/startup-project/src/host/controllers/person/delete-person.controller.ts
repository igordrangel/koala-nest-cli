import { DeletePersonHandler } from '@/application/person/delete/delete-person.handler'
import { IController } from '@koalarx/nest/core/controllers/base.controller'
import { Controller } from '@koalarx/nest/core/controllers/controller.decorator'
import { Delete, HttpCode, HttpStatus, Param } from '@nestjs/common'
import { ApiNoContentResponse } from '@nestjs/swagger'
import { PERSON_ROUTER_CONFIG } from './router.config'

@Controller(PERSON_ROUTER_CONFIG)
export class DeletePersonController implements IController<null, void, string> {
  constructor(private readonly handler: DeletePersonHandler) {}

  @Delete(':id')
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(_, @Param('id') id: string): Promise<void> {
    const response = await this.handler.handle(+id)

    if (response.isFailure()) {
      throw response.value
    }
  }
}
