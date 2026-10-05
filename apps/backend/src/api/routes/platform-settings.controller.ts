import { Body, Controller, Get, HttpException, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUserFromRequest } from '@gitroom/nestjs-libraries/user/user.from.request';
import { PlatformSettingsService } from '@gitroom/nestjs-libraries/database/prisma/platform-settings/platform-settings.service';
import { UpdatePlatformSettingsDto } from '@gitroom/nestjs-libraries/dtos/platform-settings/platform-settings.dto';

@ApiTags('Platform Settings')
@Controller('/platform-settings')
export class PlatformSettingsController {
  constructor(private _platformSettingsService: PlatformSettingsService) {}

  private assertSuperAdmin(user: User) {
    if (!user?.isSuperAdmin) {
      throw new HttpException('Unauthorized', 400);
    }
  }

  @Get('/')
  getSettings(@GetUserFromRequest() user: User) {
    this.assertSuperAdmin(user);
    return this._platformSettingsService.getSettings();
  }

  @Put('/')
  updateSettings(
    @GetUserFromRequest() user: User,
    @Body() body: UpdatePlatformSettingsDto
  ) {
    this.assertSuperAdmin(user);
    return this._platformSettingsService.updateSettings(body.values);
  }
}
