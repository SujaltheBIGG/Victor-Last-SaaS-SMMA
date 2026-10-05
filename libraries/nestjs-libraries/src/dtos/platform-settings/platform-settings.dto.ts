import { IsDefined, IsObject } from 'class-validator';

export class UpdatePlatformSettingsDto {
  @IsObject()
  @IsDefined()
  values: Record<string, string>;
}
