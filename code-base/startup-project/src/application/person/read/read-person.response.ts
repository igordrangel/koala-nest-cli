import { AutoMap } from '@koalarx/nest/core/mapping/auto-mapping.decorator'
import { ApiProperty } from '@nestjs/swagger'

export class ReadPersonPhoneResponse {
  @ApiProperty()
  @AutoMap()
  id: number

  @ApiProperty()
  @AutoMap()
  phone: string
}

export class ReadPersonResponse {
  @ApiProperty()
  @AutoMap()
  id: number

  @ApiProperty()
  @AutoMap()
  name: string

  @ApiProperty({ type: [ReadPersonPhoneResponse] })
  @AutoMap({ type: ReadPersonPhoneResponse, isArray: true})
  phones: Array<ReadPersonPhoneResponse>

  @ApiProperty()
  @AutoMap()
  status: string
}
