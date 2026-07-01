import { Inject, Injectable } from '@nestjs/common';
import { ARCJET } from '@arcjet/nest';
import type { ArcjetNest } from '@arcjet/nest';

@Injectable()
export class ArcjetService {
  constructor(
    @Inject(ARCJET) private readonly arcjet: ArcjetNest,
  ) {}

  /**
   * Access the underlying Arcjet client instance directly.
   */
  getClient(): ArcjetNest {
    return this.arcjet;
  }
}
