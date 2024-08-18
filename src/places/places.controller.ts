import { Client, Language } from '@googlemaps/google-maps-services-js';
import { Controller, Get } from '@nestjs/common';
import { ConfigService } from 'src/google-map/config/config.service';

@Controller('places')
export class PlacesController {
  private readonly client: Client;

  constructor(private readonly config: ConfigService) {
    this.client = this.config.createClient();
  }

  @Get('nearby')
  async getNearbyPlaces() {
    try {
      const places = await this.client.placesNearby({
        params: {
          key: this.config.googleMapApiKey,
          location: {
            lat: 35.653398,
            lng: 139.7973242,
          },
          radius: 200,
          type: 'restaurant',
          language: Language.ja,
        },
      });
      console.log(places);
      return places;
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      } else {
        console.error(String(e));
      }
      return 'error place nearby';
    }
  }
}
