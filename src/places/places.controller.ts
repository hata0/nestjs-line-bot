import { Client, Language } from '@googlemaps/google-maps-services-js';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { LineAuthGuard } from 'src/auth/line-auth.guard';
import { ConfigService } from 'src/google-map/config/config.service';

@Controller('places')
@UseGuards(LineAuthGuard)
export class PlacesController {
  private readonly client: Client;

  constructor(private readonly config: ConfigService) {
    this.client = this.config.createClient();
  }

  @Get('nearby')
  async getNearbyPlaces() {
    const res = await this.client.placesNearby({
      params: {
        key: this.config.googleMapApiKey,
        location: {
          lat: 35.68105651609583,
          lng: 139.76714872052918,
        },
        radius: 100,
        type: 'restaurant',
        language: Language.ja,
      },
    });
    const placesData = res.data.results.map((result) => ({
      name: result.name,
      placeId: result.place_id,
      photoReference: result.photos.length
        ? result.photos[0].photo_reference
        : undefined,
    }));
    return placesData;
  }
}
