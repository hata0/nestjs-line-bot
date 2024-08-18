import { Client } from '@googlemaps/google-maps-services-js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  readonly googleMapApiKey = process.env.GOOGLE_MAP_API_KEY;

  createClient() {
    return new Client();
  }
}
