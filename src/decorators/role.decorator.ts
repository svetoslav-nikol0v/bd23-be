import { SetMetadata } from '@nestjs/common';
import { METADATA_KEYS } from 'src/config/constants';
import { Role } from 'src/types/enums';

export const RolesDecorator = (...roles: Role[]) => SetMetadata(METADATA_KEYS.ROLES, roles);
